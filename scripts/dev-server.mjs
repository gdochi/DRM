import { spawnSync } from "node:child_process";
import { existsSync, watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "./preview-server.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const watchTargets = ["content", "src", "_modLogo", "site.config.json"].map((item) => path.join(root, item));
const port = Number(process.env.PORT || 4173);
let timer = null;
let building = false;

build();
serve(path.join(root, "dist"), port);

for (const target of watchTargets) {
  if (!existsSync(target)) continue;
  watch(target, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(build, 120);
  });
}

function build() {
  if (building) return;
  building = true;
  const result = spawnSync(process.execPath, [path.join(root, "scripts", "build.mjs")], {
    cwd: root,
    stdio: "inherit"
  });
  building = false;
  if (result.status !== 0) {
    console.error("Build failed. Fix the error above and save again.");
  }
}
