import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  snackBar = inject(MatSnackBar);

  show(message: string, action: string = 'Ok', duration: number = 4000, horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    notifyVerticalPosition: MatSnackBarVerticalPosition = 'bottom'): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: notifyVerticalPosition,
    });
  }
}
