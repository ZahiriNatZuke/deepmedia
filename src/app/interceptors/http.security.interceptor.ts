import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class HttpSecurityInterceptor implements HttpInterceptor {
  arrayEndPoints: string[] = ['user/login', 'user/jwt/refresh', 'jwt/temp_auth'];
  apiURL: string = environment.URL_API;

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const endPoint: string = request.url.replace(this.apiURL, '');
    if (this.arrayEndPoints.includes(endPoint)) {
      return next.handle(request).pipe(
          tap((response: HttpEvent<any>) => {
            if (response instanceof HttpResponse) {
              const keys = response.headers.keys();
              const headers: { key: string, value: string }[] = [];
              keys.map(key => {
                headers.push({key, value: response.headers.get(key)});
              });
              console.log(headers);
            }
          })
      );
    } else {
      return next.handle(request);
    }
  }
}
