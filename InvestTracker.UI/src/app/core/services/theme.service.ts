import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../enums/theme.enum';
import { THEME_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
	themeSignal = signal<string>(Theme.Dark);

  constructor() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      this.themeSignal.set(savedTheme as Theme);
    } else {
      this.saveTheme(Theme.Dark);
    }
  }

  updateTheme() {
    this.themeSignal.update((value) => {
      const newTheme = value === Theme.Dark ? Theme.Light : Theme.Dark;
      this.saveTheme(newTheme);
      return newTheme;
    });
  }

  private saveTheme(theme: string) {
    localStorage.setItem(THEME_KEY, theme);
  }
}
