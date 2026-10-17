// Parses public/notes/<topic>.txt into sheets. Source format:
//   @ Level                          level for the sheets that follow (Beginner, Intermediate, ...)
//   # 01 | Title | subtitle | short  a sheet (short = sidebar label)
//   ## Section title | colour | wide a section (colour/wide are legacy and ignored)
//   ### Group title                  a group heading between sections (used by cheat sheet posters)
//   - bullet   > callout   ! tip ("Remember")   Q: question   A: answer   ```lang [file] ... ```
// Inline: `code` and **keyword** (rendered as a highlighter mark).

export type QA = { q: string; a: string; text: string };
export type Block =
  | { k: 'ul'; items: string[] }
  | { k: 'note'; html: string }
  | { k: 'tip'; html: string }
  | { k: 'code'; lang: string; file: string; text: string; html: string }
  | { k: 'qa'; pairs: QA[] };
export type Section = { title: string; blocks: Block[]; isQa: boolean; group?: boolean; num?: number; tone?: number };   // num: card number; tone: accent of its group
export type Sheet = { n: string; title: string; sub: string; short: string; level: string; sections: Section[]; minutes: number };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const plain = (s: string) => s.replace(/\*\*|`/g, '');

export function inline(s: string): string {
  const codes: string[] = [];
  s = esc(s).replace(/`([^`]+)`/g, (_, c: string) => `\u0000${codes.push(c) - 1}\u0000`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<mark>$1</mark>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i: string) => `<code>${codes[+i]}</code>`);
}

export function parse(raw: string): Sheet[] {
  const sheets: Sheet[] = [];
  let sheet: Sheet | undefined;
  let sec: Section | undefined;
  let code: Extract<Block, { k: 'code' }> | undefined;
  let lines: string[] = [];
  let level = '';
  let words = 0;
  const finish = () => { if (sheet) sheet.minutes = Math.max(1, Math.round(words / 200)); words = 0; };
  const add = (b: Block) => {
    const last = sec!.blocks.at(-1);
    if (b.k === 'ul' && last?.k === 'ul') last.items.push(...b.items);
    else if (b.k === 'qa' && last?.k === 'qa') last.pairs.push(...b.pairs);
    else sec!.blocks.push(b);
  };

  for (const line of raw.split('\n')) {
    if (code) {
      if (line.startsWith('```')) { code.text = lines.join('\n'); code.html = highlight(code.text, code.lang); code = undefined; }
      else { lines.push(line); words += line.split(/\s+/).length; }
      continue;
    }
    if (line.startsWith('@ ')) { level = line.slice(2).trim(); continue; }
    if (line.startsWith('# ')) {
      finish();
      const [n, title, sub = '', short = title] = line.slice(2).split('|').map(s => s.trim());
      sheet = { n, title, sub, short, level, sections: [], minutes: 1 };
      sheets.push(sheet);
      sec = undefined;
      continue;
    }
    if (!sheet) continue;
    if (line.startsWith('### ')) {
      sec = { title: line.slice(4).trim(), blocks: [], isQa: false, group: true };
      sheet.sections.push(sec);
      continue;
    }
    if (line.startsWith('## ')) {
      sec = { title: line.slice(3).split('|')[0].trim(), blocks: [], isQa: false };
      sheet.sections.push(sec);
      continue;
    }
    if (!sec || !line.trim()) continue;
    if (line.startsWith('```')) {
      const [lang = 'text', file = ''] = line.slice(3).trim().split(/\s+/);
      code = { k: 'code', lang: lang || 'text', file, text: '', html: '' };
      lines = [];
      sec.blocks.push(code);
      continue;
    }
    const body = line.slice(/^[->!] /.test(line) ? 2 : 3);
    words += body.split(/\s+/).length;
    if (line.startsWith('- ')) add({ k: 'ul', items: [inline(body)] });
    else if (line.startsWith('> ')) add({ k: 'note', html: inline(body) });
    else if (line.startsWith('! ')) add({ k: 'tip', html: inline(body) });
    else if (line.startsWith('Q: ')) { sec.isQa = true; add({ k: 'qa', pairs: [{ q: inline(body), a: '', text: plain(body) }] }); }
    else if (line.startsWith('A: ')) { const last = sec.blocks.at(-1); if (last?.k === 'qa') last.pairs.at(-1)!.a = inline(body); }
  }
  finish();
  for (const sh of sheets) {
    let n = 0, g = -1;
    for (const x of sh.sections) { if (x.group) g++; else x.num = ++n; x.tone = Math.max(g, 0) % 8; }
  }
  return sheets;
}

const cache = new Map<string, Promise<Sheet[]>>();
export function loadTopic(id: string): Promise<Sheet[]> {
  let p = cache.get(id);
  if (!p) {
    p = fetch(`notes/${id}.txt`).then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    }).then(parse);
    p.catch(() => cache.delete(id));        // allow a retry after a failed load
    cache.set(id, p);
  }
  return p;
}

// Syntax highlighting: comments, strings, keywords, numbers, Types, calls(). Plain text stays plain.
const KW = 'abstract|and|any|as|assert|asserts|async|await|bigint|boolean|break|byte|case|catch|char|class|const|constructor|continue|declare|def|default|del|do|double|elif|else|enum|except|export|extends|false|final|finally|float|for|from|function|get|global|if|implements|import|in|infer|instanceof|int|interface|is|keyof|lambda|let|long|module|namespace|native|never|new|nonlocal|not|null|number|object|of|or|override|package|pass|permits|private|protected|public|raise|readonly|record|return|satisfies|sealed|self|set|short|static|string|super|switch|symbol|synchronized|this|throw|throws|transient|true|try|type|typeof|undefined|unique|unknown|using|var|void|volatile|when|while|with|yield|None|True|False';
const STRING = String.raw`'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|` + '`(?:\\\\.|[^`\\\\])*`';
const CLS = ['tc', 'ts', 'tk', 'tn', 'tt', 'tf'];
const reCache = new Map<string, RegExp>();

function tokenRe(lang: string): RegExp {
  let re = reCache.get(lang);
  if (!re) {
    const hash = /^(python|py|bash|sh|yaml|yml|toml|properties|dockerfile)$/.test(lang);
    const lite = /^(html|xml|json|bash|sh|nginx|toml|yaml|yml|http|markdown|md)$/.test(lang);
    const sql = lang === 'sql';
    const comment = sql ? String.raw`--[^\n]*|\/\*[\s\S]*?\*\/`
      : [hash ? '#[^\\n]*' : String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`, lang === 'html' || lang === 'xml' ? '<!--[\\s\\S]*?-->' : ''].filter(Boolean).join('|');
    const parts = [comment, STRING];
    // ponytail: in SQL every UPPERCASE word is a keyword; the notes write identifiers in lowercase
    if (sql) parts.push(String.raw`\b[A-Z][A-Z0-9_]*\b`, String.raw`\b\d+(?:\.\d+)?\b`);
    else if (!lite) parts.push(`\\b(?:${KW})\\b`, String.raw`\b\d[\d_]*(?:\.\d+)?[nLf]?\b`, String.raw`\b[A-Z][A-Za-z0-9_]*\b`, String.raw`\b[a-zA-Z_][\w$]*(?=\()`);
    re = new RegExp(parts.map(p => `(${p})`).join('|'), 'g');
    reCache.set(lang, re);
  }
  return re;
}

export function highlight(text: string, lang: string): string {
  if (lang === 'text') return esc(text);
  const re = tokenRe(lang);
  let out = '', last = 0, m: RegExpExecArray | null;
  re.lastIndex = 0;
  while ((m = re.exec(text))) {
    if (!m[0]) { re.lastIndex++; continue; }
    const g = m.findIndex((v, i) => i > 0 && v !== undefined);
    out += esc(text.slice(last, m.index)) + `<span class="${CLS[g - 1]}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(text.slice(last));
}

// Revision progress lives in localStorage ("rev:<topic>:<sheet>" = "1"); keys match the old kit pages.
export const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* blocked: progress is best-effort */ } },
  del(k: string) { try { localStorage.removeItem(k); } catch { /* blocked */ } },
};
