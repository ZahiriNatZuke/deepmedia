import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';
import * as moment from 'moment';
import 'moment/locale/es-us';
import {Banished} from '../models/banished';
import {CrudService} from '../services/crud.service';
import {NotificationService} from '../services/notification.service';
import {Router} from '@angular/router';

@Injectable()
export class HttpSecurityInterceptor implements HttpInterceptor {
  arrayEndPoints: string[] = ['user/login', 'user/jwt/refresh', 'jwt/temp_auth'];
  apiURL: string = environment.URL_API;

  constructor(private crudService: CrudService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('X-Banished')) {
      const banished: Banished = JSON.parse(localStorage.getItem('X-Banished'));
      if (moment(banished.banish_expired_at * 1000).isBefore()) {
        localStorage.removeItem('X-Banished');
        this.crudService.RequestToEraseBan(banished.user, banished.hash)
            .subscribe(() => {
              return this.router.navigate(['/video/categories']).then();
            });
      } else {
        this.router.navigate(['/forbidden']).then();
        this.notificationService.showErrors('Info Seguridad', [
          `Usuario aún Baneado.`,
          `Causa: ${banished.why}`,
          `Por: ${banished.byWho}.`,
          `Fin: ${moment(banished.banish_expired_at * 1000).fromNow()}.`
        ], 'danger');
        return;
      }
    }

    const endPoint: string = request.url.replace(this.apiURL, '');

    if (this.arrayEndPoints.includes(endPoint)) {
      return next.handle(request).pipe(
          tap((response: HttpEvent<any>) => {
            if (response instanceof HttpResponse) {
              if (endPoint === 'jwt/temp_auth') {
                sessionStorage.setItem('X-Temp-JWT', response.headers.get('x-temp-jwt'));
              } else {
                sessionStorage.setItem('X-Authentication-JWT', response.headers.get('x-authentication-jwt'));
                sessionStorage.setItem('X-Encode-ID', response.headers.get('x-encode-id'));
                localStorage.setItem('X-Refresh-JWT', response.headers.get('x-refresh-jwt'));
              }
            }
          }));
    } else {
      return next.handle(request);
    }
  }
}
