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
    response.writeHead(200, { "Content-Type": contentType(target) });
    createReadStream(target).pipe(response);
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
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp"
  }[ext] || "application/octet-stream";
}
