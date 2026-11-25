import { DestroyRef, Directive, ElementRef, effect, inject, input } from '@angular/core';
import { animate, cubicBezier, type JSAnimation } from 'animejs';

// A number that counts to its new value, ported from React Bits "CountUp" (ease-out cubicBezier(.33, 1, .68, 1))
// and Magic UI "NumberTicker" (tabular figures, starts from 0 on first show). Built on anime.js, the
// project's one motion library. Reduced motion: the number is set directly.
@Directive({ selector: '[countUp]', host: { style: 'font-variant-numeric: tabular-nums' } })
export class CountUp {
  readonly countUp = input.required<number>();
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private shown = 0;
  private anim?: JSAnimation;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.anim?.revert());
    effect(() => {
      const to = this.countUp();
      this.anim?.pause();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || to === this.shown) {
        this.shown = to;
        this.el.textContent = String(to);
        return;
      }
      const state = { n: this.shown };
      this.anim = animate(state, {
        n: to,
        duration: Math.min(1200, 380 + Math.abs(to - this.shown) * 60),
        ease: cubicBezier(0.33, 1, 0.68, 1),
        onUpdate: () => { this.shown = Math.round(state.n); this.el.textContent = String(this.shown); },
        onComplete: () => { this.shown = to; this.el.textContent = String(to); },
      });
    });
  }
}
