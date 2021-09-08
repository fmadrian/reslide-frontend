import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}
  /**
   * Gets ISO string from date.
   */
  getISOString(date: Date) {
    if (date) {
      return date.toISOString();
    }
    return '';
  }
  /**
   * Gets date from ISO string.
   */
  getDate(isoString: string) {
    return new Date(isoString).toLocaleString();
  }
}
