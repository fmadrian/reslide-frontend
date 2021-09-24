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
   * Gets date from ISO isoDate (string).
   */
  getDate(isoDate: string) {
    return new Date(isoDate);
  }
  getLocaleString(isoDate: string) {
    return new Date(isoDate).toLocaleString();
  }
}
