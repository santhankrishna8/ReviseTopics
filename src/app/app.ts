import { Component, ElementRef, afterNextRender, computed, effect, signal, untracked, viewChild } from '@angular/core';
import { Sheet, loadTopic, store } from './notes';
import { CHEATS, GROUPS, READY, Topic } from './topics';
import { PageLink, SheetView } from './sheet';
import { ThemeToggle } from './theme-toggle';
import { CountUp } from './count-up';

type Route = { topic: string; sheet: string; section?: number };
type Hit = { kind: 'Sheet' | 'Section' | 'Question'; title: string; where: string; href: string; hay: string };

const HOME: Route = { topic: 'missed', sheet: '01' };   // the most asked questions first
const label = (t: Topic) => (t.hidden ? `${t.name} Cheat Sheet` : t.name);   // sidebar shows the short name
const start = (t: Topic) => `#/${t.id}/${t.poster ? '01' : 'b'}`;   // 'b' = the Interview Basics sheet; falls back to the first sheet
const doneKey = (topic: string, n: string) => `rev:${topic}:${n}`;

function parseHash(hash: string): Route | null {
  const m = hash.match(/^#\/([\w-]+)\/(\w+?)(?:\/(\d+))?$/);
  if (!m || !READY.some(t => t.id === m[1])) return null;
  return { topic: m[1], sheet: m[2], section: m[3] === undefined ? undefined : +m[3] };
}

function initialRoute(): Route {
  const fromHash = parseHash(location.hash);
  if (fromHash) return fromHash;
  const last = parseHash('#/' + (store.get('last') ?? ''));
  const r = last ? { topic: last.topic, sheet: last.sheet } : HOME;
  history.replaceState(null, '', `#/${r.topic}/${r.sheet}`);
  return r;
}

function byLevel(list: Sheet[]) {
  const out: { level: string; sheets: Sheet[] }[] = [];
  for (const s of list) {
    if (out.at(-1)?.level !== s.level) out.push({ level: s.level, sheets: [] });
    out.at(-1)!.sheets.push(s);
  }
  return out;
}

@Component({
  selector: 'app-root',
  imports: [SheetView, ThemeToggle, CountUp],
  host: { '(window:hashchange)': 'onHash()', '(window:keydown)': 'onKey($event)' },
  template: `
    <a class="skip" href="#main" (click)="skipToMain($event)">Skip to content</a>
    <p class="sr-only" role="status" aria-live="polite" aria-atomic="true">{{ announcement() }}</p>
    <header class="top">
      <button type="button" class="icon-btn menu" popovertarget="sidebar" aria-label="Open topic list">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <a class="logo" href="#/{{ home.topic }}/{{ home.sheet }}" aria-label="ReviseNotes home">
        <img class="logo-mark" src="icon.svg" alt="" width="28" height="28" />
        <span class="logo-text">ReviseNotes</span>
      </a>

      <div class="search" (focusout)="onSearchBlur($event)">
        <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input #searchBox type="search" placeholder="Search" autocomplete="off" spellcheck="false"
               role="combobox" aria-label="Search notes" aria-controls="search-results" aria-autocomplete="list"
               [attr.aria-expanded]="showResults() && hits().length > 0" [attr.aria-activedescendant]="showResults() && hits().length ? 'hit-' + activeHit() : null"
               [value]="query()" (input)="onQuery($event)" (focus)="openSearch()" (keydown)="onSearchKey($event)" />
        <kbd aria-hidden="true">{{ shortcut }}</kbd>
        <span class="sr-only" role="status">{{ searchStatus() }}</span>
        @if (showResults()) {
          @if (hits().length) {
            <div class="results">
            <ul id="search-results" class="results-list" role="listbox" aria-label="Search results">
              @for (h of hits(); track h.href + h.title; let i = $index) {
                <li [id]="'hit-' + i" role="option" [attr.aria-selected]="i === activeHit()"
                    (mousedown)="$event.preventDefault()" (click)="go(h.href)" (mousemove)="activeHit.set(i)">
                  <span class="hit-kind">{{ h.kind }}</span>
                  <span class="hit-title">@for (p of marked(h.title); track $index) {@if (p.hit) {<mark>{{ p.t }}</mark>} @else {<span>{{ p.t }}</span>}}</span>
                  <span class="hit-where">{{ h.where }}</span>
                </li>
              }
            </ul>
            <p class="results-foot" aria-hidden="true"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>Esc</kbd> close</span></p>
            </div>
          } @else {
            <div class="results"><p class="no-hits">No matches for "{{ query().trim() }}"</p></div>
          }
        }
      </div>

      <button type="button" class="icon-btn" (click)="random()" aria-label="Random question (r)" title="Random question (r), weighted to shaky sheets">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
      </button>
      <app-theme-toggle />
    </header>

    <div class="layout">
      <nav id="sidebar" #sidebar popover aria-label="Topics" (toggle)="onDrawerToggle($event)">
        <button type="button" class="drawer-close" popovertarget="sidebar" popovertargetaction="hide">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
          Close topic list
        </button>
        <!-- Progress through every topic's Interview Basics sheet, and the next one to revise. -->
        <div class="basics">
          @if (basics(); as b) {
            <p class="basics-progress"><span class="basics-count"><span [countUp]="b.done"></span> of {{ b.total }}</span> Interview Basics revised</p>
            <!-- one cell per topic's Basics sheet, filled with the highlighter once revised -->
            <ol class="strip" aria-hidden="true">
              @for (c of b.cells; track c.id; let i = $index) { <li [class.on]="c.done" [style.--n]="i" [title]="c.name"></li> }
            </ol>
            @if (b.next; as n) {
              <a class="basics-next" [href]="'#/' + n.id + '/b'">
                <span class="basics-next-hint">Up next</span>
                <span class="basics-next-name">{{ n.name }}<span class="sr-only">, Interview Basics</span></span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            } @else {
              <p class="basics-done">Every Basics sheet is revised. Rate the shaky ones and they come back when due.</p>
            }
          } @else {
            <!-- holds the space while the topics load, so the topic list does not jump -->
            <div class="basics-skeleton" aria-hidden="true"><span></span><span></span></div>
          }
        </div>
        @if (due().length) {
          <p class="label">Due for revision ({{ due().length }})</p>
          <ul class="sheets due">
            @for (d of due(); track d.href) { <li><a [href]="d.href" [class.shaky]="d.lvl === 1">{{ d.label }}</a></li> }
          </ul>
        }
        @for (g of groups; track g.name) {
          <p class="label">{{ g.name }}</p>
          <ul class="topics">
            @for (t of g.topics; track t.id) {
              <li>
                @if (t.poster) {
                  @let here = route().topic === t.id;
                  <a class="topic direct" [href]="'#/' + t.id + '/01'" [class.active]="here" [attr.aria-current]="here ? 'page' : null">
                    <span class="topic-name">{{ t.name }}</span>
                    @if (isDone(t.id, '01')) { <svg class="tick" viewBox="0 0 24 24" role="img" aria-label="revised"><path d="M20 6 9 17l-5-5"/></svg> }
                  </a>
                } @else {
                  <button type="button" class="topic" [attr.aria-expanded]="expanded().has(t.id)" (click)="toggle(t.id)">
                    <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="topic-name">{{ t.name }}</span>
                  </button>
                  @if (expanded().has(t.id) && levels()[t.id]; as lv) {
                    @for (l of lv; track l.level; let first = $first) {
                      @if (l.level) { <p class="level">{{ l.level }}</p> }
                      <ul class="sheets">
                        @for (s of l.sheets; track s.n) {
                          @let current = route().topic === t.id && sheet()?.n === s.n;
                          <li>
                            @let revised = isDone(t.id, s.n);
                            <a [href]="'#/' + t.id + '/' + s.n" [class.active]="current" [class.done]="revised" [attr.aria-current]="current ? 'page' : null">
                              <span>{{ s.short }}</span>
                              @if (revised) { <span class="sr-only">(revised)</span> }
                            </a>
                          </li>
                        }
                      </ul>
                      @if (first && cheats[t.id]; as c) {
                        <ul class="sheets cheat-link"><li><a [href]="'#/' + c + '/01'" [class.done]="isDone(c, '01')">
                          <span>Cheat sheet · one page</span>
                        </a></li></ul>
                      }
                    }
                  }
                }
              </li>
            }
          </ul>
        }
        <p class="label">Progress</p>
        <div class="data-actions">
          <button type="button" class="btn btn-outline" (click)="exportProgress()">Export</button>
          <button type="button" class="btn btn-outline" (click)="importFile.click()">Import</button>
          <input #importFile type="file" accept="application/json" hidden tabindex="-1" aria-hidden="true" (change)="importProgress($event)" />
        </div>
      </nav>
      <div class="resizer" role="separator" tabindex="0" aria-orientation="vertical" aria-controls="sidebar"
           aria-label="Resize topic list (drag, arrow keys; double-click resets)"
           [attr.aria-valuenow]="sidebarW()" [attr.aria-valuemin]="minSidebarW" [attr.aria-valuemax]="maxSidebarW"
           (pointerdown)="startResize($event)" (keydown)="resizeKey($event)" (dblclick)="sidebarW.set(defaultSidebarW)"></div>

      <main class="main" id="main" tabindex="-1">
        @if (sheet(); as s) {
          <app-sheet [topicName]="topicName()" [base]="'#/' + route().topic + '/' + s.n" [sheet]="s"
                     [section]="route().section" [prev]="prev()" [next]="next()"
                     [done]="isDone(route().topic, s.n)" (toggleDone)="toggleDone()"
                     [cheat]="cheat()" [rating]="rating(route().topic, s.n)" (rate)="rate($event)" [poster]="poster()" />
        } @else if (error()) {
          <div class="state" role="alert">
            <h1>Couldn't load {{ topicName() }}</h1>
            <p>{{ error() }}</p>
            <button type="button" class="btn btn-primary" (click)="retry()">Try again</button>
          </div>
        } @else {
          <div class="state skeleton" role="status" aria-busy="true" aria-label="Loading notes">
            <span></span><span></span><span></span><span></span>
          </div>
        }
      </main>
    </div>
  `,
})
export class App {
  // Every topic, in GROUPS order. Cheat sheets are reached from their topic, so groups with only hidden topics are dropped.
  protected readonly groups = GROUPS.map(g => ({ ...g, topics: g.topics.filter(t => !t.hidden) })).filter(g => g.topics.length);
  private readonly visible = computed(() => this.groups.flatMap(g => g.topics));
  protected readonly cheats = CHEATS;
  private readonly failed = signal(new Set<string>());
  // Progress through every topic's Interview Basics sheet (id "b"), and the first one not yet revised.
  // Hidden until every topic has loaded, so the count never jumps.
  protected readonly basics = computed(() => {
    const failed = this.failed();
    const topics = this.visible().filter(t => !t.poster && !failed.has(t.id));   // a topic that failed to load is left out, not waited on
    const loaded = this.sheets();
    if (!topics.length || topics.some(t => !loaded[t.id])) return null;
    const withBasics = topics.filter(t => loaded[t.id]!.some(s => s.n === 'b'));
    if (!withBasics.length) return null;
    const cells = withBasics.map(t => ({ id: t.id, name: t.name, done: this.isDone(t.id, 'b') }));
    const open = withBasics.filter((_, i) => !cells[i].done);
    return { done: withBasics.length - open.length, total: withBasics.length, next: open[0], cells };
  });
  protected readonly home = HOME;
  protected readonly shortcut = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K';

  protected readonly route = signal(initialRoute());
  protected readonly sheets = signal<Partial<Record<string, Sheet[]>>>({});
  protected readonly error = signal('');
  protected readonly expanded = signal(new Set([this.route().topic]));
  private readonly progressTick = signal(0);
  protected readonly announcement = signal('');   // polite live region: "<sheet title>, <topic>" after each navigation
  private announcedKey = '';

  protected readonly levels = computed(() => {
    const out: Partial<Record<string, ReturnType<typeof byLevel>>> = {};
    for (const [id, list] of Object.entries(this.sheets())) out[id] = byLevel(list!);
    return out;
  });
  protected readonly topicName = computed(() => label(READY.find(t => t.id === this.route().topic)!));
  protected readonly cheat = computed(() => { const c = CHEATS[this.route().topic]; return c ? `#/${c}/01` : undefined; });
  protected readonly poster = computed(() => !!READY.find(t => t.id === this.route().topic)!.poster);
  private readonly position = computed(() => {
    const list = this.sheets()[this.route().topic];
    if (!list?.length) return undefined;
    const i = Math.max(0, list.findIndex(s => s.n === this.route().sheet));
    return { list, i };
  });
  protected readonly sheet = computed(() => { const p = this.position(); return p?.list[p.i]; });
  protected readonly prev = computed<PageLink | undefined>(() => {
    const p = this.position();
    const s = p && p.list[p.i - 1];
    return s && { href: `#/${this.route().topic}/${s.n}`, label: s.short, hint: 'Previous' };
  });
  protected readonly next = computed<PageLink | undefined>(() => {
    const p = this.position();
    if (!p) return undefined;
    const s = p.list[p.i + 1];
    if (s) return { href: `#/${this.route().topic}/${s.n}`, label: s.short, hint: 'Next' };
    const t = this.visible().find((_, i, a) => a[i - 1]?.id === this.route().topic);
    return t && { href: start(t), label: t.name, hint: 'Next topic' };
  });

  // Search over every written topic: sheet titles, section titles and interview questions.
  protected readonly query = signal('');
  protected readonly searchOpen = signal(false);
  protected readonly activeHit = signal(0);
  private readonly index = computed(() => {
    const hits: Hit[] = [];
    for (const t of READY) {
      for (const s of this.sheets()[t.id] ?? []) {
        const where = `${label(t)} › ${s.short}`;
        const base = `#/${t.id}/${s.n}`;
        hits.push({ kind: 'Sheet', title: s.title, where: label(t), href: base, hay: `${label(t)} ${s.title} ${s.short} ${s.sub}`.toLowerCase() });
        s.sections.forEach((sec, i) => {
          hits.push({ kind: 'Section', title: sec.title, where, href: `${base}/${i}`, hay: `${sec.title} ${label(t)} ${sec.blocks.map(b => b.k === 'ul' ? b.items.join(' ') : b.k === 'note' || b.k === 'tip' ? b.html : '').join(' ').replace(/<[^>]+>/g, '')}`.toLowerCase() });
          for (const b of sec.blocks) {
            if (b.k === 'qa') for (const p of b.pairs) hits.push({ kind: 'Question', title: p.text, where, href: `${base}/${i}`, hay: `${p.text} ${t.name}`.toLowerCase() });
          }
        });
      }
    }
    return hits;
  });
  protected readonly hits = computed(() => {
    const terms = this.query().trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const rank = { Sheet: 0, Section: 1, Question: 2 };
    return this.index()
      .filter(h => terms.every(term => h.hay.includes(term)))
      .map(h => ({ h, inTitle: terms.every(term => h.title.toLowerCase().includes(term)) }))
      .sort((x, y) => +y.inTitle - +x.inTitle || rank[x.h.kind] - rank[y.h.kind] || x.h.title.length - y.h.title.length)
      .map(x => x.h)
      .slice(0, 8);
  });
  // A result title split into plain and matched parts, so each search term gets the highlighter
  // (pattern: matched letters marked in 21st.dev command palettes). Text only: no innerHTML.
  protected marked(title: string) {
    const terms = this.query().trim().toLowerCase().split(/\s+/).filter(Boolean);
    const lower = title.toLowerCase(), hit = new Array<boolean>(title.length).fill(false);
    for (const term of terms) for (let i = lower.indexOf(term); i !== -1; i = lower.indexOf(term, i + term.length)) hit.fill(true, i, i + term.length);
    const parts: { t: string; hit: boolean }[] = [];
    for (let i = 0; i < title.length; i++) {
      if (parts.at(-1)?.hit === hit[i]) parts.at(-1)!.t += title[i];
      else parts.push({ t: title[i], hit: hit[i] });
    }
    return parts;
  }
  protected readonly showResults = computed(() => this.searchOpen() && this.query().trim().length > 0);
  protected readonly searchStatus = computed(() => {
    if (!this.showResults()) return '';
    const n = this.hits().length;
    return n ? `${n} ${n === 1 ? 'result' : 'results'}` : 'No matches';
  });

  private readonly searchBox = viewChild.required<ElementRef<HTMLInputElement>>('searchBox');
  private readonly sidebar = viewChild.required<ElementRef<HTMLElement>>('sidebar');

  // Resizable sidebar (desktop): width in px, remembered in localStorage.
  protected readonly minSidebarW = 200;
  protected readonly maxSidebarW = 560;
  protected readonly defaultSidebarW = 288;
  protected readonly sidebarW = signal(this.clampW(Number(store.get('sidebarW')) || this.defaultSidebarW));

  constructor() {
    effect(() => {
      const w = this.sidebarW();
      document.documentElement.style.setProperty('--sidebar-w', `${w}px`);
      store.set('sidebarW', String(w));
    });
    effect(() => {
      const r = this.route();
      untracked(() => {
        this.ensure(r.topic);
        this.expanded.set(new Set([r.topic]));   // one topic open at a time keeps the sidebar short
      });
      store.set('last', `${r.topic}/${r.sheet}`);
    });
    // Only when the sheet changes: tracking expanded() too made opening any topic jump the sidebar back to the current sheet.
    effect(() => { this.sheet(); untracked(() => this.revealActive()); });
    effect(() => {
      const s = this.sheet();
      document.title = s ? `${s.title} · ${this.topicName()} · ReviseNotes` : 'ReviseNotes';
      // Hash routing never reloads the page, so a screen reader hears nothing when the sheet changes: announce it.
      // Not on first load (the browser already reads the title), and only when the sheet itself changes.
      const key = s ? `${this.route().topic}/${s.n}` : '';
      untracked(() => {
        if (key && key !== this.announcedKey) {
          if (this.announcedKey !== '') this.announcement.set(`${s!.title}, ${this.topicName()}`);
          this.announcedKey = key;
        }
      });
    });
    // Load the other written topics in the background: search and the due list need them.
    afterNextRender(() => setTimeout(() => READY.forEach(t => this.ensure(t.id)), 400));
  }

  private async ensure(id: string) {
    if (this.sheets()[id]) return;
    try {
      const list = await loadTopic(id);
      this.sheets.update(s => ({ ...s, [id]: list }));
      if (this.failed().has(id)) this.failed.update(f => { const n = new Set(f); n.delete(id); return n; });
    } catch (e) {
      this.failed.update(f => new Set(f).add(id));
      if (id === this.route().topic) this.error.set(`The notes file could not be fetched (${(e as Error).message}). Check that the app is running, then try again.`);
    }
  }

  // href="#main" would hijack the hash router, so the skip link focuses <main> instead.
  protected skipToMain(e: Event) {
    e.preventDefault();
    document.getElementById('main')?.focus({ preventScroll: true });
    document.getElementById('main')?.scrollIntoView({ block: 'start' });
  }

  protected retry() { this.error.set(''); this.ensure(this.route().topic); }

  protected onHash() {
    const r = parseHash(location.hash);
    if (!r) { history.replaceState(null, '', `#/${HOME.topic}/${HOME.sheet}`); this.route.set(HOME); }
    else this.route.set(r);
    const nav = this.sidebar().nativeElement;
    if (nav.matches(':popover-open')) nav.hidePopover();
  }

  // Keep the open sheet visible in the sidebar (and centred when the phone drawer opens).
  private revealActive(center = false) {
    requestAnimationFrame(() => {
      const nav = this.sidebar().nativeElement;
      const a = nav.querySelector<HTMLElement>('a.active');
      if (!a) return;
      // measured against the sidebar itself: offsetTop is relative to the positioned .sheets list, not the sidebar
      const top = a.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop, bottom = top + a.offsetHeight;
      if (center || top < nav.scrollTop || bottom > nav.scrollTop + nav.clientHeight) nav.scrollTop = top - nav.clientHeight / 2;
    });
  }
  protected onDrawerToggle(e: Event) { if ((e as ToggleEvent).newState === 'open') this.revealActive(true); }

  private clampW(w: number) { return Math.round(Math.min(this.maxSidebarW, Math.max(this.minSidebarW, w))); }
  protected startResize(e: PointerEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    const handle = e.currentTarget as HTMLElement;
    const startX = e.clientX, startW = this.sidebarW();
    const move = (m: PointerEvent) => this.sidebarW.set(this.clampW(startW + m.clientX - startX));
    const stop = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', stop);
      handle.removeEventListener('pointercancel', stop);
      document.body.classList.remove('resizing');
    };
    handle.setPointerCapture(e.pointerId);        // keep getting moves after the pointer leaves the thin handle
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
    document.body.classList.add('resizing');
  }
  protected resizeKey(e: KeyboardEvent) {
    const w = this.sidebarW(), step = e.shiftKey ? 48 : 16;
    const next = e.key === 'ArrowLeft' ? w - step : e.key === 'ArrowRight' ? w + step
      : e.key === 'Home' ? this.minSidebarW : e.key === 'End' ? this.maxSidebarW : null;
    if (next === null) return;
    e.preventDefault();
    this.sidebarW.set(this.clampW(next));
  }

  protected toggle(id: string) {
    this.ensure(id);
    this.expanded.update(s => s.has(id) ? new Set<string>() : new Set([id]));   // accordion: opening one closes the rest
  }

  protected isDone(topic: string, n: string) { this.progressTick(); return store.get(doneKey(topic, n)) === '1'; }
  protected toggleDone() {
    const s = this.sheet();
    if (!s) return;
    const key = doneKey(this.route().topic, s.n);
    if (this.isDone(this.route().topic, s.n)) store.del(key); else store.set(key, '1');
    this.progressTick.update(v => v + 1);
  }

  protected rating(topic: string, n: string) {
    this.progressTick();
    const v = store.get(`conf:${topic}:${n}`);
    if (!v) return null;
    const [lvl, date] = v.split('|');
    return { lvl: +lvl, date };
  }
  protected rate(lvl: number) {
    const s = this.sheet();
    if (!s) return;
    const t = this.route().topic;
    store.set(`conf:${t}:${s.n}`, `${lvl}|${new Date().toISOString().slice(0, 10)}`);
    store.set(doneKey(t, s.n), '1');
    this.progressTick.update(v => v + 1);
  }
  // Spaced revision: shaky sheets come back after 2 days, OK after 7, solid after 21.
  protected readonly due = computed(() => {
    const gap = [2, 7, 21], out: { href: string; label: string; lvl: number }[] = [];
    for (const t of READY) for (const s of this.sheets()[t.id] ?? []) {
      const r = this.rating(t.id, s.n);
      if (r && (Date.now() - Date.parse(r.date)) / 864e5 >= gap[r.lvl - 1]) out.push({ href: `#/${t.id}/${s.n}`, label: `${t.name} › ${s.short}`, lvl: r.lvl });
    }
    return out.sort((a, b) => a.lvl - b.lvl).slice(0, 8);
  });
  protected random() {
    READY.forEach(t => this.ensure(t.id));
    const qs = this.index().filter(h => h.kind === 'Question');
    if (!qs.length) return;
    const weak = qs.filter(h => { const m = h.href.match(/#\/([\w-]+)\/(\w+)/)!; return this.rating(m[1], m[2])?.lvl === 1; });
    const pool = weak.length && Math.random() < 0.6 ? weak : qs;
    this.go(pool[Math.floor(Math.random() * pool.length)].href);
  }
  protected exportProgress() {
    const o: Record<string, string> = {};
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i)!; if (/^(rev|conf):/.test(k)) o[k] = localStorage.getItem(k)!; } } catch { /* blocked */ }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(o)], { type: 'application/json' }));
    a.download = 'revisenotes-progress.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  protected async importProgress(e: Event) {
    const input = e.target as HTMLInputElement, f = input.files?.[0];
    if (!f) return;
    try { for (const [k, v] of Object.entries(JSON.parse(await f.text()))) if (/^(rev|conf):/.test(k) && typeof v === 'string') store.set(k, v); } catch { /* not a progress file */ }
    this.progressTick.update(v => v + 1);
    input.value = '';
  }

  protected openSearch() { this.searchOpen.set(true); READY.forEach(t => this.ensure(t.id)); }
  protected onQuery(e: Event) { this.query.set((e.target as HTMLInputElement).value); this.activeHit.set(0); this.searchOpen.set(true); }
  protected onSearchBlur(e: FocusEvent) {
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) this.searchOpen.set(false);
  }
  protected onSearchKey(e: KeyboardEvent) {
    const n = this.hits().length;
    if (e.key === 'ArrowDown' && n) { e.preventDefault(); this.activeHit.set((this.activeHit() + 1) % n); }
    else if (e.key === 'ArrowUp' && n) { e.preventDefault(); this.activeHit.set((this.activeHit() - 1 + n) % n); }
    else if (e.key === 'Enter' && n) { e.preventDefault(); this.go(this.hits()[this.activeHit()].href); }
    else if (e.key === 'Escape') { this.query.set(''); this.searchBox().nativeElement.blur(); }
  }
  protected go(href: string) {
    this.query.set('');
    this.searchOpen.set(false);
    this.searchBox().nativeElement.blur();
    if (location.hash === href) this.onHash(); else location.hash = href;
  }
  protected onKey(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.searchBox().nativeElement.focus();
      return;
    }
    if (/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'j' && this.next()) location.hash = this.next()!.href;
    else if (e.key === 'k' && this.prev()) location.hash = this.prev()!.href;
    else if (e.key === 'r') this.random();
  }
}
