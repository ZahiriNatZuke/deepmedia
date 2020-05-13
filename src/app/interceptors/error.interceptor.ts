import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthenticationService} from "../services/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {MsgDialogComponent} from "../modules/shared/dialogs/msg-dialog/msg-dialog.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, public dialog: MatDialog) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      // if (err.status === 401) {
      // this.authenticationService.POSTForLogout();
      this.dialog.open(MsgDialogComponent, {
        width: '100%',
        maxHeight: '550px',
        autoFocus: true,
        role: 'dialog',
        position: {
          top: '40px',
        }
      });
      // }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
