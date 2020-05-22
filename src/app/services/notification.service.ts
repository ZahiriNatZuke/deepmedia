import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MsgDialogComponent} from '../modules/shared/dialogs/msg-dialog/msg-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  showNotification(from: string, message: string, status: string) {
    this.snackBar.openFromComponent(MsgDialogComponent, {
      duration: 2500,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      data: {from, message, status}
    });
  }
}
