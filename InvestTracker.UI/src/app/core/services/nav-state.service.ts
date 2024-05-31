import { Injectable, signal } from '@angular/core';
import { NavState } from '../enums/nav-state.enum';
import { NAV_STATE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class NavStateService {
	navStateSignal = signal<string>(NavState.Opened);

  constructor() {
    const savedNavState = localStorage.getItem(NAV_STATE);
    if (savedNavState) {
      this.navStateSignal.set(savedNavState as NavState);
    } else {
      localStorage.setItem(NAV_STATE, NavState.Opened);
    }
  }

  updateState() {
    this.navStateSignal.update((value) => {
      const newState = value === NavState.Opened ? NavState.Hide : NavState.Opened;
      localStorage.setItem(NAV_STATE, newState);
      return newState;
    });
  }
}
