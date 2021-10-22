import { Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  @Output() isSidenavOpen: BehaviorSubject<boolean>;
  constructor(private localStorage: LocalStorageService) {
    // Assign a default value (true) and store it or retrieve the current value.
    if (this.localStorage.retrieve('isSidenavOpen') === null) {
      this.isSidenavOpen = new BehaviorSubject<boolean>(true);
      this.localStorage.store('isSidenavOpen', this.isSidenavOpen.value);
    } else {
      const currentValue = this.localStorage.retrieve('isSidenavOpen');
      this.isSidenavOpen = new BehaviorSubject<boolean>(currentValue);
    }
  }

  getIsSidenavOpen() {
    return this.localStorage.retrieve('isSidenavOpen');
  }
  switchSidenav() {
    // We have to store the change before emiting a new value, otherwise it'll use the old value and not the new one
    /**
     * 1. Switch ON -> OFF (triggers behavior subject)
     *    2. OLD value (ON) is read from storage
     * 3. New value (OFF) is stored
     */
    this.localStorage.store('isSidenavOpen', !this.isSidenavOpen.value);
    this.isSidenavOpen.next(!this.isSidenavOpen.value); // IMPORTANT: Use next instead of init to submit new values.
  }
}
