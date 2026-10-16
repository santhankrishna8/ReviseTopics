import { Component, effect, input, output, signal, untracked } from '@angular/core';
import { Sheet } from './notes';

export type PageLink = { href: string; label: string; hint: string };

@Component({
  selector: 'app-sheet',
  host: { class: 'sheet-view', '(window:scroll)': 'spy()', '(window:resize)': 'spy()' },
  template: `
    <article class="doc">
      <div class="doc-bar">
        <nav class="crumbs" aria-label="Breadcrumb">
          <span>{{ topicName() }}</span>
          <span class="sep" aria-hidden="true">/</span>
          <span class="here" aria-current="page">{{ sheet().short }}</span>
          <span class="pill">{{ sheet().minutes }} min read</span>
        </nav>
        <button type="button" class="btn btn-outline" [class.is-done]="done()" [attr.aria-pressed]="done()" (click)="toggleDone.emit()">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
          {{ done() ? 'Completed' : 'Mark complete' }}
        </button>
      </div>

      <div class="pager">
        @if (prev(); as p) {
          <a class="btn btn-green" [href]="p.href" [attr.aria-label]="'Previous: ' + p.label">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>Previous
          </a>
        } @else { <span></span> }
        @if (next(); as n) {
          <a class="btn btn-green" [href]="n.href" [attr.aria-label]="'Next: ' + n.label">
            Next<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        }
      </div>

      <h1>{{ sheet().title }}</h1>
      @if (sheet().sub) { <p class="lede">{{ sheet().sub }}</p> }

      @for (sec of sheet().sections; track $index; let i = $index) {
        <section class="sec" [id]="'sec-' + i" [attr.aria-labelledby]="'h-' + i">
          <div class="sec-head">
            <h2 [id]="'h-' + i">{{ sec.title }}</h2>
            @if (sec.isQa) {
              <button type="button" class="quiz" [attr.aria-pressed]="quiz()" (click)="quiz.set(!quiz())"
                      title="Hide answers so you can test yourself">
                <span class="switch" aria-hidden="true"></span>Quiz mode
              </button>
            }
          </div>
          @for (b of sec.blocks; track $index) {
            @if (b.k === 'ul') {
              <ul>
                @for (li of b.items; track $index) { <li [innerHTML]="li"></li> }
              </ul>
            } @else if (b.k === 'note') {
              <p class="callout" [innerHTML]="b.html"></p>
            } @else if (b.k === 'code') {
              @let key = i + '-' + $index;
              <figure class="code">
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
                  <details class="qa" [open]="!quiz()">
                    <summary>
                      <span class="qn">{{ ($index + 1).toString().padStart(2, '0') }}</span>
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

      <footer class="doc-foot">
        <button type="button" class="btn btn-outline btn-lg" [class.is-done]="done()" [attr.aria-pressed]="done()" (click)="toggleDone.emit()">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
          {{ done() ? 'Completed' : 'Mark this sheet complete' }}
        </button>
        <nav class="foot-nav" aria-label="Sheet navigation">
          @if (prev(); as p) {
            <a class="foot-link" [href]="p.href"><span class="hint">{{ p.hint }}</span><span class="title">{{ p.label }}</span></a>
          } @else { <span></span> }
          @if (next(); as n) {
            <a class="foot-link next" [href]="n.href"><span class="hint">{{ n.hint }}</span><span class="title">{{ n.label }}</span></a>
          }
        </nav>
      </footer>
    </article>

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
  readonly toggleDone = output<void>();

  protected readonly quiz = signal(false);
  protected readonly activeSec = signal(0);
  protected readonly copied = signal('');
  private raf = 0;

  constructor() {
    // New sheet or deep link to a section: reset quiz mode, then scroll once the DOM is updated.
    effect(() => {
      this.sheet();
      const sec = this.section();
      untracked(() => this.quiz.set(false));
      requestAnimationFrame(() => {
        const el = sec === undefined ? null : document.getElementById('sec-' + sec);
        if (el) el.scrollIntoView({ block: 'start' });
        else window.scrollTo({ top: 0 });
        this.spy();
      });
    });
  }

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
