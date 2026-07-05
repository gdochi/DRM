import { mkdir, readdir, readFile, rm, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src");
const contentDir = path.join(root, "content");
const distDir = path.join(root, "dist");
const assetsDir = path.join(distDir, "assets");
const mediaDir = path.join(srcDir, "media");
const distMediaDir = path.join(assetsDir, "media");

const config = JSON.parse(await readFile(path.join(root, "site.config.json"), "utf8"));
const docsByLocale = {};

for (const locale of Object.keys(config.locales || {})) {
  docsByLocale[locale] = await loadLocale(locale);
}

await rm(distDir, { recursive: true, force: true });
await mkdir(assetsDir, { recursive: true });

let template = await readFile(path.join(srcDir, "template.html"), "utf8");
template = template
  .replace(/<html lang="[^"]*">/, `<html lang="${escapeAttr(config.defaultLocale || "ko")}">`)
  .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(config.description)}" />`)
  .replace(/<title>.*<\/title>/, `<title>${escapeHtml(config.title)}</title>`);

await writeFile(path.join(distDir, "index.html"), template, "utf8");
await copyFile(path.join(srcDir, "styles.css"), path.join(assetsDir, "styles.css"));
await copyFile(path.join(srcDir, "app.js"), path.join(assetsDir, "app.js"));
await copyDirectory(mediaDir, distMediaDir);
await writeFile(
  path.join(assetsDir, "docs-data.js"),
  `window.DRM_DOCS_CONFIG = ${JSON.stringify(config)};\nwindow.DRM_DOCS_DATA = ${JSON.stringify(docsByLocale)};\n`,
  "utf8"
);

console.log(`Built ${Object.values(docsByLocale).flat().length} documents into ${path.relative(root, distDir)}`);

async function loadLocale(locale) {
  const localeDir = path.join(contentDir, locale);
  let files = [];
  try {
    files = (await readdir(localeDir)).filter((file) => file.endsWith(".md")).sort();
  } catch {
    return [];
  }

  const docs = [];
  for (const file of files) {
    const raw = await readFile(path.join(localeDir, file), "utf8");
    const { data, body } = parseFrontMatter(raw);
    if (data.hiddenNav) continue;
    const slug = data.slug || file.replace(/^\d+-/, "").replace(/\.md$/, "");
    const rendered = renderMarkdown(body, slug);
    docs.push({
      slug,
      title: data.title || titleFromSlug(slug),
      order: Number(data.order || 999),
      description: data.description || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      product: data.product || "core",
      category: data.category || "General",
      hiddenNav: Boolean(data.hiddenNav),
      status: data.status || "Draft",
      version: data.version || "",
      audience: data.audience || "",
      sourcePath: path.relative(root, path.join(localeDir, file)).replace(/\\/g, "/"),
      html: rendered.html,
      headings: rendered.headings,
      searchText: stripMarkdown(body)
    });
  }

  return docs.sort((a, b) => a.order - b.order);
}

async function copyDirectory(source, target) {
  let entries = [];
  try {
    entries = await readdir(source, { withFileTypes: true });
  } catch {
    return;
  }

  await mkdir(target, { recursive: true });
  for (const entry of entries) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(from, to);
    } else if (entry.isFile()) {
      await copyFile(from, to);
    }
  }
}

function parseFrontMatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) return { data: {}, body: normalized };
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) return { data: {}, body: normalized };
  const yaml = normalized.slice(4, end).trim();
  const body = normalized.slice(end + 5).trim();
  const data = {};
  let activeList = null;

  for (const line of yaml.split("\n")) {
    if (!line.trim()) continue;
    const listMatch = line.match(/^\s*-\s+(.+)$/);
    if (listMatch && activeList) {
      data[activeList].push(parseScalar(listMatch[1]));
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (value === "") {
      data[key] = [];
      activeList = key;
    } else {
      data[key] = parseScalar(value);
      activeList = null;
    }
  }

  return { data, body };
}

function parseScalar(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return trimmed;
}

function renderMarkdown(markdown, docSlug) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const headings = [];
  const html = [];
  const paragraph = [];
  let i = 0;
  let headingCount = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph.length = 0;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      i += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      flushParagraph();
      const lang = trimmed.slice(3).trim();
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      html.push(`<pre><code${lang ? ` class="language-${escapeAttr(lang)}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const calloutMatch = trimmed.match(/^:::(note|tip|warning|danger)\s*(.*)$/);
    if (calloutMatch) {
      flushParagraph();
      const [, type, title] = calloutMatch;
      const body = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== ":::") {
        body.push(lines[i]);
        i += 1;
      }
      i += 1;
      const inner = renderMarkdown(body.join("\n"), `${docSlug}-callout-${i}`).html;
      html.push(`<aside class="callout ${type}">${title ? `<div class="callout-title">${escapeHtml(title)}</div>` : ""}${inner}</aside>`);
      continue;
    }

    const headingMatch = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length;
      const text = stripInlineSyntax(headingMatch[2]);
      headingCount += 1;
      const id = `${docSlug}-${slugify(text) || `section-${headingCount}`}`;
      headings.push({ level, id, text });
      html.push(`<h${level} id="${id}">${renderInline(headingMatch[2])}</h${level}>`);
      i += 1;
      continue;
    }

    if (isTableStart(lines, i)) {
      flushParagraph();
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i += 1;
      }
      html.push(renderTable(tableLines));
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i += 1;
      }
      html.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      html.push(`<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ol>`);
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      const quote = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      html.push(`<blockquote>${quote.map((item) => `<p>${renderInline(item)}</p>`).join("")}</blockquote>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      html.push("<hr />");
      i += 1;
      continue;
    }

    paragraph.push(trimmed);
    i += 1;
  }

  flushParagraph();
  return { html: html.join("\n"), headings };
}

function isTableStart(lines, index) {
  if (!lines[index]?.trim().startsWith("|")) return false;
  const next = lines[index + 1]?.trim();
  return Boolean(next && /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(next));
}

function renderTable(lines) {
  const rows = lines
    .filter((_, index) => index !== 1)
    .map((line) => line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));
  const [head, ...body] = rows;
  return `<div class="table-wrap"><table><thead><tr>${head.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function renderInline(value) {
  const code = [];
  let text = String(value).replace(/`([^`]+)`/g, (_, match) => {
    code.push(`<code>${escapeHtml(match)}</code>`);
    return `\u0000CODE${code.length - 1}\u0000`;
  });
  text = escapeHtml(text);
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, (_, label, href) => `<a href="${escapeAttr(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`);
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
  text = text.replace(/\u0000CODE(\d+)\u0000/g, (_, index) => code[Number(index)] || "");
  return text;
}

function stripInlineSyntax(value) {
  return String(value)
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
    .replace(/[\*_>#]/g, "")
    .trim();
}

function stripMarkdown(value) {
  return String(value)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/:::(note|tip|warning|danger)[\s\S]*?:::/g, " ")
    .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function titleFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}
