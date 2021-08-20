import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  duration = 3000;
  closePrompt = 'OK';
  constructor(private _snackBar: MatSnackBar) {}

  show(msg: string) {
    this._snackBar.open(msg, this.closePrompt, { duration: this.duration });
  }
}
