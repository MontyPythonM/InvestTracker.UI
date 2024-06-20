import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ErrorResponse } from '../modules/error-response.model';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  snackBar = inject(MatSnackBar);

  show(message: string, action: string = 'Ok', duration: number = 4000, horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    notifyVerticalPosition: MatSnackBarVerticalPosition = 'bottom', panelClasses: string[] = []): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: notifyVerticalPosition,
      panelClass: panelClasses
    });
  }

  showError(err: any) {
    try {
      let errors = err.error as ErrorResponse;
      this.show(errors.errors[0].exceptionMessage, 'Ok', 4000, 'right', 'bottom', ['error-snackbar']);
    }
    catch {
      this.show('An undefined error has occurred', 'Ok', 4000, 'right', 'bottom', ['error-snackbar']);
    }
  }
}
