import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const decode = text => text.replace(/&#(x[\da-f]+|\d+);/gi, (_, value) => String.fromCodePoint(value[0].toLowerCase() === 'x' ? parseInt(value.slice(1),16) : Number(value)))
  .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, entity) => ({ amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ' })[entity]);

function parse(html) {
  const root = { tag: 'root', children: [] };
  const stack = [root];
  for (const token of html.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) || []) {
    if (token.startsWith('<!--')) continue;
    if (!token.startsWith('<')) { stack.at(-1).children.push({ text: decode(token) }); continue; }
    const close = token.match(/^<\/([\w-]+)/);
    if (close) {
      const index = stack.findLastIndex(node => node.tag === close[1].toLowerCase());
      if (index > 0) stack.length = index;
      continue;
    }
    const open = token.match(/^<([\w-]+)/);
    if (!open) continue;
    const node = { tag: open[1].toLowerCase(), children: [], attrs: {} };
    for (const [, key, double, single, bare] of token.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) node.attrs[key.toLowerCase()] = decode(double ?? single ?? bare);
    stack.at(-1).children.push(node);
    if (!['br','hr','img','input','meta','link'].includes(node.tag) && !token.endsWith('/>')) stack.push(node);
  }
  return root;
}

const textOf = node => node.text ?? node.children.map(textOf).join('');
const isScope = text => /^(?:Forge|NeoForge|Fabric)\b/i.test(text.trim()) && !/\b(?:Added|Fixed|Changed|Improved|Ported|version|Mods|crash)\b/i.test(text)
  && /^(?:(?:NeoForge|Forge|Fabric)|[\d.\s/&,:()+-]|and|only|Minecraft)+$/i.test(text.trim());

export function scopeMatches(label, loader, minecraft) {
  const tokens = label.match(/NeoForge|Forge|Fabric|\d+\.\d+(?:\.\d+)?/g) || [];
  const groups = [];
  let group = { loaders: [], versions: [] };
  for (const token of tokens) {
    if (/^[A-Z]/.test(token)) {
      if (group.versions.length) { groups.push(group); group = { loaders: [], versions: [] }; }
      group.loaders.push(token);
    } else group.versions.push(token);
  }
  groups.push(group);
  return groups.some(group => (!group.loaders.length || group.loaders.includes(loader)) && (!group.versions.length || group.versions.includes(minecraft)));
}

export function scopedNotes(html, loader, minecraft, { inferItemPlatforms = true, preserveSubcategories = false } = {}) {
  // A few early uploads contain Markdown headings/lists inside HTML paragraphs.
  const normalized = html.replace(/\r\n/g, '\n').replace(/<p>([\s\S]*?)<\/p>/g, (original, body) => {
    if (!/^(?:#{1,6}\s|[-*]\s)/.test(body.trim())) return original;
    let list = false;
    const output = [];
    for (const line of body.split(/<br\s*\/?>|\n/).map(line => line.trim()).filter(Boolean)) {
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      const item = line.match(/^[-*]\s+(.+)$/);
      if (list && !item) { output.push('</ul>'); list = false; }
      if (heading) output.push(`<h${heading[1].length}>${heading[2]}</h${heading[1].length}>`);
      else if (item) { if (!list) { output.push('<ul>'); list = true; } output.push(`<li>${item[1]}</li>`); }
      else output.push(`<p>${line}</p>`);
    }
    if (list) output.push('</ul>');
    return output.join('');
  });
  const root = parse(normalized);
  const allowed = new Set(['h4','p','ul','ol','li','strong','b','em','i','code','pre','blockquote','a','br','table','thead','tbody','tr','td','th']);
  const render = node => {
    if (node.text !== undefined) return escape(node.text);
    const label = textOf(node).trim();
    if (['script','style','iframe','img'].includes(node.tag)) return '';
    if (node.tag === 'li') {
      const prefix = node.children.filter(child => !['ul','ol'].includes(child.tag)).map(textOf).join('').trim();
      if (isScope(prefix) && node.children.some(child => ['ul','ol'].includes(child.tag))) return scopeMatches(prefix, loader, minecraft) ? `<li>${node.children.filter(child => ['ul','ol'].includes(child.tag)).map(render).join('')}</li>` : '';
      // Some older releases put target-specific changes directly in list items.
      if (inferItemPlatforms && /^(?:Added|Fixed|Improved|Changed)\b/.test(prefix) && /\b(?:Forge|NeoForge|Fabric)\b/.test(prefix)) {
        const platforms = prefix.match(/\b(?:NeoForge|Forge|Fabric)\b/g);
        if (!platforms.includes(loader)) return '';
      }
    }
    if (node.tag === 'tr') {
      const scopeCell = node.children.find(child => child.tag === 'td' && isScope(textOf(child).trim()));
      if (scopeCell && !scopeMatches(textOf(scopeCell), loader, minecraft)) return '';
      return `<tr>${node.children.map(child => child === scopeCell ? `<td>${escape(loader)} ${escape(minecraft)}</td>` : render(child)).join('')}</tr>`;
    }
    const children = node.children.map(render).join('');
    if (!allowed.has(node.tag)) return children;
    if (['ul','ol'].includes(node.tag) && !/<li>/.test(children)) return '';
    if (node.tag === 'a') return /^https:\/\//.test(node.attrs.href || '') ? `<a href="${escape(node.attrs.href)}" target="_blank" rel="noreferrer">${children}</a>` : children;
    if (node.tag === 'br') return '<br>';
    return `<${node.tag}>${children}</${node.tag}>`;
  };
  const flatten = nodes => nodes.flatMap(node => node.tag === 'div' ? flatten(node.children) : [node]);
  let include = true;
  let scopeLevel = 0;
  let categoryLevel = 0;
  const output = [];
  for (const node of flatten(root.children)) {
    const label = textOf(node).trim();
    if (/^h[1-6]$/.test(node.tag || '')) {
      const level = Number(node.tag[1]);
      if (/\b\d+\.\d+\.\d+\b.*(?:Change\s*Log|Release)/i.test(label) || /(?:Change\s*Log|Release).*\b\d+\.\d+\.\d+\b/i.test(label)) continue;
      if (/^(?:Global|Common Changes)$/i.test(label)) { include = true; scopeLevel = level; categoryLevel = 0; continue; }
      if (isScope(label)) { include = scopeMatches(label, loader, minecraft); scopeLevel = level; categoryLevel = 0; continue; }
      if (scopeLevel && level < scopeLevel) { include = true; scopeLevel = 0; }
      if (include) {
        const isCategory = /^(Added|Fixed|Changed|Improved)$/.test(label);
        const tag = preserveSubcategories && !isCategory && categoryLevel && level > categoryLevel ? 'h4' : 'h3';
        if (isCategory) categoryLevel = level;
        else if (tag === 'h3') categoryLevel = 0;
        output.push(`<${tag}>${escape(label)}</${tag}>`);
      }
    } else if (include) output.push(render(node));
  }
  // Merge categories repeated by Global and environment-specific sections.
  // This retains the source wording while presenting each category once.
  const categories = new Map(['Added','Fixed','Changed','Improved'].map(title => [title, new Map([['', []]])]));
  const append = (title, section, html) => {
    const sections = categories.get(title);
    if (!sections.has(section)) sections.set(section, []);
    sections.get(section).push(html);
  };
  const before = [];
  const after = [];
  let category = '';
  let subcategory = '';
  let otherSection = false;
  for (const node of parse(output.join('')).children) {
    if (node.tag === 'h3') {
      const title = textOf(node).trim();
      category = categories.has(title) ? title : '';
      subcategory = '';
      otherSection = !category;
      if (otherSection) after.push(`<h3>${escape(title)}</h3>`);
      continue;
    }
    if (category && node.tag === 'h4') subcategory = textOf(node).trim();
    else if (category) append(category, subcategory, render(node));
    else if (otherSection) after.push(render(node));
    else if (node.tag === 'ul') {
      const remaining = [];
      for (const child of node.children) {
        if (child.tag !== 'li') continue;
        const inferred = textOf(child).trim().match(/^(Added|Fixed|Changed|Improved)\b/)?.[1];
        if (inferred) append(inferred, '', `<ul>${render(child)}</ul>`);
        else remaining.push(render(child));
      }
      if (remaining.length) before.push(`<ul>${remaining.join('')}</ul>`);
    } else before.push(render(node));
  }
  const grouped = [...categories].flatMap(([title, sections]) => {
    const blocks = [...sections].flatMap(([section, content]) => content.some(block => block.trim())
      ? [...(section ? [`<h4>${escape(section)}</h4>`] : []), ...content] : []);
    return blocks.length ? [`<h3>${title}</h3>`, ...blocks] : [];
  });
  return [...before, ...grouped, ...after].join('').replace(/<\/ul>\s*<ul>/g, '\n').trim();
}

export async function loadChangelogs(directory, published) {
  const releases = [];
  for (const project of published.projects) {
    const folder = path.join(directory, project.product);
    for (const filename of (await readdir(folder)).filter(name => name.endsWith('.json'))) {
      const release = JSON.parse(await readFile(path.join(folder, filename), 'utf8'));
      if (release.product !== project.product || filename !== `${release.version}.json`) throw new Error(`Changelog path/version mismatch: ${folder}/${filename}`);
      if (release.source === 'author') {
        if (release.projectId !== project.projectId || !/^\d+\.\d+\.\d+$/.test(release.version)
            || !Number.isFinite(Date.parse(release.publishedAt)) || !release.html?.trim()
            || !Array.isArray(release.environments) || !release.environments.length
            || ['files','id','status','uploadedAt','url'].some(key => Object.hasOwn(release, key))) {
          throw new Error(`Invalid author changelog: ${folder}/${filename}`);
        }
        const environments = new Set();
        for (const environment of release.environments) {
          const key = `${environment.loader}/${environment.minecraft}`;
          if (!['Forge', 'NeoForge', 'Fabric'].includes(environment.loader)
              || !/^\d+\.\d+(?:\.\d+)?$/.test(environment.minecraft) || environments.has(key)) {
            throw new Error(`Invalid author changelog environment: ${release.product}/${release.version}/${key}`);
          }
          if (project.files.some(file => file.version === release.version && file.versions.includes(environment.loader) && file.minecraft === environment.minecraft)) {
            throw new Error(`Use verified public-file notes for this published environment: ${release.product}/${release.version}/${key}`);
          }
          environments.add(key);
          releases.push({ product: release.product, version: release.version, loader: environment.loader, minecraft: environment.minecraft,
            source: 'author', publishedAt: release.publishedAt, url: '', uploadedAt: '',
            html: scopedNotes(release.html, environment.loader, environment.minecraft, {
              inferItemPlatforms: false, preserveSubcategories: /^###### /m.test(release.markdown || '')
            }) });
        }
        continue;
      }
      const ids = new Set();
      for (const file of release.files) {
        const verified = project.files.find(item => item.id === file.id && item.version === release.version);
        if (!verified || file.status !== 4 || !verified.versions.includes(file.loader) || verified.minecraft !== file.minecraft || verified.url !== file.url || ids.has(file.id)) throw new Error(`Unverified changelog environment/file: ${release.product}/${release.version}/${file.id}`);
        ids.add(file.id);
        releases.push({
          product: release.product, version: release.version, loader: file.loader, minecraft: file.minecraft,
          id: file.id, url: file.url, uploadedAt: file.uploadedAt,
          html: scopedNotes(file.html, file.loader, file.minecraft)
        });
      }
    }
  }
  if (releases.filter(release => release.source !== 'author').length !== published.projects.reduce((count, project) => count + project.files.length, 0)) throw new Error('Missing public changelog files');
  return releases;
}
