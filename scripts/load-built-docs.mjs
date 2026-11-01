import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

export async function loadBuiltDocs(dist) {
  const context = { window: {} };
  vm.runInNewContext(await readFile(path.join(dist, 'assets/docs-data.js'), 'utf8'), context);
  for (const relative of Object.values(context.window.DRM_DOCS_CONFIG.localeFiles || {})) {
    if (!/^assets\/docs-[a-z]{2}\.js(?:\?v=[a-z0-9]+)?$/.test(relative)) throw new Error(`Invalid language asset: ${relative}`);
    vm.runInNewContext(await readFile(path.join(dist, relative.split('?')[0]), 'utf8'), context);
  }
  return { config: context.window.DRM_DOCS_CONFIG, data: context.window.DRM_DOCS_DATA };
}
