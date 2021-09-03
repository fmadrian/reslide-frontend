import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  constructor() {}
  add(x: number, y: number) {
    return x + y;
  }
  /**
   * Allows to filter undefined values
   */
  numberFilter(x: number | undefined) {
    if (x !== undefined) {
      return parseFloat(x.toFixed(2)); // Rounds it to 2 decimals
    }
    return 0;
  }
}
