import { Component, signal } from '@angular/core';
import { store } from './notes';

// Light/dark switch, ported from 21st.dev "Sliding Icon Theme Switch" (bundui/switch8):
// a pill track whose half-width thumb slides across and carries the active mode's icon.
// index.html applies the saved theme before Angular starts, so there is no flash.
@Component({
  selector: 'app-theme-toggle',
  template: `
    <button type="button" class="theme-toggle" role="switch" [attr.aria-checked]="dark()"
            aria-label="Dark mode" [title]="dark() ? 'Switch to light mode' : 'Switch to dark mode'" (click)="toggle()">
      <span class="tt-thumb" aria-hidden="true">
        @if (dark()) {
          <svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        } @else {
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        }
      </span>
    </button>
  `,
})
export class ThemeToggle {
  protected readonly dark = signal(document.documentElement.dataset['theme'] === 'dark');

  protected toggle() {
    const theme = this.dark() ? 'light' : 'dark';
    this.dark.set(theme === 'dark');
    document.documentElement.dataset['theme'] = theme;
    store.set('theme', theme);
  }
}
