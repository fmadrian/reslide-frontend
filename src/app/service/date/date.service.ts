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
  isValidDate(isoDate: string) {
    if (new Date(isoDate).toString() !== 'Invalid Date') {
      return true;
    }
    return false;
  }
  // Sets the time of a date to 0:00:00 or 23:59:59
  setTimeTo(date: Date, day: 'start' | 'finish') {
    if (day === 'start') {
      date.setHours(0, 0, 0);
    } else if (day === 'finish') {
      date.setHours(23, 59, 59);
    }
    return date;
  }
}
