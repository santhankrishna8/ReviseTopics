import { Component, effect, input, output, signal, untracked } from '@angular/core';
import { Sheet, store } from './notes';

export type PageLink = { href: string; label: string; hint: string };

@Component({
  selector: 'app-sheet',
  host: { class: 'sheet-view', '[class.poster]': 'poster()', '[class.quick]': 'quick()', '[class.must-only]': 'mustOnly()', '(window:scroll)': 'spy()', '(window:resize)': 'spy()' },
  template: `
    <article class="doc">
      <div class="doc-bar">
        <nav class="crumbs" aria-label="Breadcrumb">
          <span>{{ topicName() }}</span>
          <span class="sep" aria-hidden="true">/</span>
          <span class="here" aria-current="page">{{ sheet().short }}</span>
        </nav>
        <div class="bar-actions">
          @if (cheat(); as c) { <a class="btn btn-outline" [href]="c">Cheat sheet</a> }
          @if (poster()) {
            <button type="button" class="btn btn-outline" [attr.aria-pressed]="selfTest()" (click)="setSelfTest(!selfTest())"
                    title="Hide each card's answer so you can test yourself, then reveal it">Self-test</button>
          }
          @if (!poster()) {
            <button type="button" class="btn btn-outline" [attr.aria-pressed]="quick()" (click)="setQuick(!quick())"
                    title="Show only definitions, tips and questions">Quick revise</button>
          }
          <button type="button" class="btn btn-outline" [class.is-done]="done()" [attr.aria-pressed]="done()" (click)="toggleDone.emit()">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
            {{ done() ? 'Completed' : 'Mark complete' }}
          </button>
        </div>
      </div>

      <header class="doc-head">
        <h1>{{ sheet().title }}</h1>
        @if (sheet().sub) { <p class="lede">{{ sheet().sub }}</p> }
        <p class="meta">
          @if (sheet().level) { <span>{{ sheet().level }}</span> }
          <span>{{ sheet().minutes }} min read</span>
          @if (!poster()) { <span>{{ sheet().sections.length }} sections</span> }
        </p>
      </header>

      <div [class.cards]="poster()">
      @for (sec of sheet().sections; track $index; let i = $index) {
        @if (sec.group) {
          <h2 class="sec grp" [id]="'sec-' + i" [attr.data-tone]="sec.tone">{{ sec.title }}</h2>
        } @else {
        <section class="sec" [class.hide-body]="poster() && selfTest() && !revealed().has(i)" [id]="'sec-' + i" [attr.data-tone]="sec.tone" [attr.aria-labelledby]="'h-' + i">
          <div class="sec-head">
            <h2 [id]="'h-' + i">@if (poster()) { <span class="num">{{ sec.num }}</span> }{{ sec.title }}</h2>
            @if (sec.isQa) {
              <button type="button" class="quiz" [attr.aria-pressed]="mustOnly()" (click)="setMust(!mustOnly())"
                      title="Show only the most commonly asked questions"><span class="switch" aria-hidden="true"></span>Must-know only</button>
              <button type="button" class="quiz" [attr.aria-pressed]="quiz()" (click)="setQuiz(!quiz())"
                      title="Hide answers so you can test yourself">
                <span class="switch" aria-hidden="true"></span>Quiz mode
              </button>
            }
          </div>
          @if (poster() && selfTest() && !revealed().has(i)) {
            <button type="button" class="reveal" (click)="reveal(i)">Show answer</button>
          }
          @for (b of sec.blocks; track $index) {
            @if (b.k === 'ul') {
              <ul>
                @for (li of b.items; track $index) { <li [innerHTML]="li"></li> }
              </ul>
            } @else if (b.k === 'note') {
              <p class="callout" [innerHTML]="b.html"></p>
            } @else if (b.k === 'tip') {
              <p class="tip"><span class="tip-label">Remember</span><span [innerHTML]="b.html"></span></p>
            } @else if (b.k === 'code') {
              @let key = i + '-' + $index;
              <figure class="code" [attr.data-lang]="b.lang">
                <figcaption>
                  <span class="code-title">{{ b.file || 'Example' }}</span>
                  <span class="lang">{{ b.lang }}</span>
                  <button type="button" class="copy" (click)="copy(b.text, key)">
                    {{ copied() === key ? 'Copied' : 'Copy' }}
                  </button>
                </figcaption>
                <pre><code [innerHTML]="b.html"></code></pre>
              </figure>
            } @else if (b.k === 'qa') {
              <div class="qa-list">
                @for (p of b.pairs; track $index) {
                  <details class="qa" [class.must]="p.must" [open]="!quiz()">
                    <summary>
                      <span class="qn">{{ ($index + 1).toString().padStart(2, '0') }}</span>@if (p.must) { <span class="star" title="Must-know" aria-label="Must-know">★</span> }
                      <span class="q" [innerHTML]="p.q"></span>
                      <svg class="qchev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                    </summary>
                    <p class="a" [innerHTML]="p.a"></p>
                  </details>
                }
              </div>
            }
          }
        </section>
        }
      }
      </div>

      <footer class="doc-foot">
        <div class="rate" role="group" aria-label="How well do you know this?">
          <span>How well do you know it?</span>
          @for (r of rates; track r.lvl) {
            <button type="button" class="btn btn-outline" [attr.aria-pressed]="rating()?.lvl === r.lvl" (click)="rate.emit(r.lvl)">{{ r.name }}</button>
          }
          @if (rating(); as r) { <small>last rated {{ r.date }}</small> }
        </div>
        <button type="button" class="btn btn-outline btn-lg" [class.is-done]="done()" [attr.aria-pressed]="done()" (click)="toggleDone.emit()">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
          {{ done() ? 'Completed' : 'Mark this sheet complete' }}
        </button>
        @if (!poster()) {
        <nav class="foot-nav" aria-label="Sheet navigation">
          @if (prev(); as p) {
            <a class="foot-link" [href]="p.href"><span class="hint">{{ p.hint }}</span><span class="title">{{ p.label }}</span></a>
          } @else { <span></span> }
          @if (next(); as n) {
            <a class="foot-link next" [href]="n.href"><span class="hint">{{ n.hint }}</span><span class="title">{{ n.label }}</span></a>
          }
        </nav>
        }
      </footer>
    </article>

    @if (!poster()) {
    <aside class="toc" aria-label="On this page">
      <p class="label">On this page</p>
      <ul>
        @for (sec of sheet().sections; track $index; let i = $index) {
          <li>
            <a [href]="base() + '/' + i" [class.active]="activeSec() === i" [attr.aria-current]="activeSec() === i ? 'location' : null"
               (click)="goTo($event, i)">{{ sec.title }}</a>
          </li>
        }
      </ul>
    </aside>
    }
  `,
})
export class SheetView {
  readonly topicName = input.required<string>();
  readonly base = input.required<string>();          // "#/java/03"
  readonly sheet = input.required<Sheet>();
  readonly section = input<number>();
  readonly prev = input<PageLink>();
  readonly next = input<PageLink>();
  readonly done = input(false);
  readonly poster = input(false);                    // cheat sheets: sections become a grid of cards
  readonly cheat = input<string>();
  readonly rating = input<{ lvl: number; date: string } | null>(null);
  readonly toggleDone = output<void>();
  readonly rate = output<number>();
  protected readonly rates = [{ lvl: 1, name: 'Shaky' }, { lvl: 2, name: 'OK' }, { lvl: 3, name: 'Solid' }];
  protected readonly quick = signal(store.get('quick') === '1');
  protected setQuick(v: boolean) { this.quick.set(v); store.set('quick', v ? '1' : '0'); }

  protected readonly quiz = signal(store.get('quiz') === '1');
  protected readonly selfTest = signal(store.get('selftest') === '1');   // cheat sheets: hide card bodies until revealed
  protected readonly revealed = signal<Set<number>>(new Set());
  protected setSelfTest(v: boolean) { this.selfTest.set(v); this.revealed.set(new Set()); store.set('selftest', v ? '1' : '0'); }
  protected reveal(i: number) { this.revealed.update(s => new Set(s).add(i)); }
  protected readonly activeSec = signal(0);
  protected readonly copied = signal('');
  private raf = 0;

  constructor() {
    // New sheet or deep link to a section: reset quiz mode, then scroll once the DOM is updated.
    effect(() => {
      this.sheet();
      untracked(() => this.revealed.set(new Set()));
      const sec = this.section();
      requestAnimationFrame(() => {
        const el = sec === undefined ? null : document.getElementById('sec-' + sec);
        if (el) el.scrollIntoView({ block: 'start' });
        else window.scrollTo({ top: 0 });
        this.spy();
      });
    });
  }

  protected readonly mustOnly = signal(store.get('must') === '1');
  protected setMust(v: boolean) { this.mustOnly.set(v); store.set('must', v ? '1' : '0'); }
  protected setQuiz(v: boolean) { this.quiz.set(v); store.set('quiz', v ? '1' : '0'); }

  protected spy() {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      const secs = document.querySelectorAll<HTMLElement>('.sec');
      let active = 0;
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= 140) active = i; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = secs.length - 1;
      this.activeSec.set(active);
    });
  }

  protected goTo(e: MouseEvent, i: number) {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;          // let "open in new tab" work
    e.preventDefault();
    history.replaceState(null, '', this.base() + '/' + i);
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('sec-' + i)?.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'auto' });
  }

  protected async copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(key);
      setTimeout(() => { if (this.copied() === key) this.copied.set(''); }, 1600);
    } catch { /* clipboard blocked: the code is still selectable */ }
  }
}
