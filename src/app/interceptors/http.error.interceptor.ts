import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {NotificationService} from '../services/notification.service';
import {catchError, map, retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Banished} from '../models/banished';
import * as moment from 'moment';
import 'moment/locale/es-us';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  errors2xx = [200, 201];
  errors4xx = [401, 403, 404];

  constructor(private notificationService: NotificationService,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(1),
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (this.errors2xx.includes(event.status) && event.body.from !== undefined)
              this.notificationService.showNotification(event.body.from, event.body.message, 'success');
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          switch (true) {
            case this.errors4xx.includes(error.status):
              if (error.error.error_message !== undefined && !error.error.banished)
                this.notificationService.showNotification(error.error.from, error.error.error_message, 'danger');
              if (error.status === 404)
                this.router.navigate(['/not-found']).then();
              if (error.status === 401) {
                this.eraseCredentials();
                this.router.navigate(['/auth/login']).then();
              }
              if (error.status === 403) {
                if (error.error.banished) {
                  this.eraseCredentials();
                  const banished: Banished = error.error.banished;
                  localStorage.setItem('X-Banished', JSON.stringify(banished));
                  this.notificationService.showErrors(error.error.from, [
                    `${error.error.error_message}.`,
                    `Causa: ${banished.why}`,
                    `Por: ${banished.byWho}.`,
                    `Fin: ${moment(banished.banish_expired_at * 1000).fromNow()}.`
                  ], 'danger');
                }
                this.router.navigate(['/forbidden']).then();
              }
              break;
            case error.status === 422:
              this.notificationService.showErrors(error.error.from, error.error.errors, 'info');
              break;
            case error.status === 500:
              this.notificationService.showNotification('Info', 'Conexión Perdida, vuelva a intentarlo', 'warning');
              break;
            default:
              break;
          }
          return throwError(error);
        })
    );
  }

  eraseCredentials() {
    sessionStorage.clear();
    localStorage.clear();
    this.authenticationService.UpdateCurrentUserValue(null);
  }
}
