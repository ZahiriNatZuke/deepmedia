import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MsgDialogComponent} from '../modules/shared/dialogs/msg-dialog/msg-dialog.component';
import {ErrorsDialogComponent} from '../modules/shared/dialogs/errors-dialog/errors-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  showNotification(from: string, message: string, status: string) {
    this.snackBar.openFromComponent(MsgDialogComponent, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      data: {from, message, status}
    });
  }

  showErrors(from: string, errors: string[], status: string) {
    this.snackBar.openFromComponent(ErrorsDialogComponent, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      data: {from, errors, status}
    });
  }

}
