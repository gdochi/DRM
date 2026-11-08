import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const port = Number(process.env.PORT || 4173);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  serve(dist, port);
}

export function serve(baseDir, listenPort) {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    const decoded = decodeURIComponent(url.pathname);
    const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
    const file = path.normalize(path.join(baseDir, relative));

    if (!file.startsWith(baseDir)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const target = existsSync(file) && (await stat(file)).isFile() ? file : path.join(baseDir, "index.html");
    const { size } = await stat(target);
    const headers = {
      "Content-Type": contentType(target),
      "Cache-Control": "no-store, max-age=0",
      "Accept-Ranges": "bytes",
      "Content-Length": size
    };
    let status = 200, streamOptions;
    // Browsers need byte ranges to seek within WebM/MP4 recordings.
    const range = request.method === "GET" && request.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
    if (range) {
      const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      if ((!range[1] && !range[2]) || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || end < start) {
        response.writeHead(416, { ...headers, "Content-Range": `bytes */${size}`, "Content-Length": 0 });
        response.end();
        return;
      }
      status = 206;
      headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
      headers["Content-Length"] = end - start + 1;
      streamOptions = { start, end };
    }
    response.writeHead(status, headers);
    if (request.method === "HEAD") { response.end(); return; }
    const stream = createReadStream(target, streamOptions);
    response.on("close", () => stream.destroy());
    stream.on("error", () => response.destroy());
    stream.pipe(response);
  });

  server.listen(listenPort, () => {
    console.log(`Preview server running at http://localhost:${listenPort}`);
  });

  return server;
}

function contentType(file) {
  const ext = path.extname(file);
  return {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".gif": "image/gif",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp"
  }[ext] || "application/octet-stream";
}
