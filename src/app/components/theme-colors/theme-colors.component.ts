import {ChangeDetectionStrategy, Component, effect, signal} from '@angular/core';

@Component({
  selector: 'app-theme-colors',
  standalone: true,
  imports: [],
  templateUrl: './theme-colors.component.html',
  styleUrl: './theme-colors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeColorsComponent {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    effect(() => {
      const theme = this.theme();
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`);
    });
  }

  toggleTheme(): void {
    this.theme.update((theme) => theme === 'light' ? 'dark' : 'light');
  }
}
