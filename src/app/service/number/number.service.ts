import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  constructor() {}

  // Filters undefined numbers and returns the sum of them.
  addAll(numbers: any[]) {
    return parseFloat(
      numbers
        .map(this.numberFilter)
        .reduce((x, y) => x + y, 0)
        .toFixed(2)
    );
  }
  /**
   * Allows to filter undefined values
   */
  private numberFilter(x: number | undefined) {
    if (x !== undefined) {
      return parseFloat(x.toFixed(2)); // Rounds it to 2 decimals
    }
    return 0;
  }
}
