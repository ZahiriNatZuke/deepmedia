import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from './API';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Channel} from '../models/channel';
import {CrudService} from './crud.service';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';

const api = new API();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Channel>;
  public currentUser: Observable<Channel>;

  constructor(private httpClient: HttpClient,
              private crudService: CrudService,
              private notificationService: NotificationService,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Channel>(JSON.parse(sessionStorage.getItem('X-Auth-User')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Channel {
    return this.currentUserSubject.value;
  }

  public UpdateCurrentUserValue(channel: Channel) {
    sessionStorage.setItem('X-Auth-User', JSON.stringify(channel));
    this.currentUserSubject.next(channel);
  }

  POSTForLogin(body: { username: string, password: string }) {
    return this.httpClient.post<any>(api.getLoginURL(), body, {headers: api.getHeadersWithOutAuth()})
        .pipe(first(), map(response => {
          const user = response.auth_user;
          sessionStorage.setItem('X-Auth-User', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  POSTForLogout() {
    return this.httpClient.post<any>(api.getLogOutURL(), {}, {headers: api.getHeadersForLogout()})
        .pipe(first()).subscribe(() => {
          sessionStorage.clear();
          localStorage.clear();
          this.currentUserSubject.next(null);
          this.router.navigate(['/auth/login']).then();
        });
  }

  POSTForRefreshJWT() {
    return this.httpClient.post<any>(api.getRefreshJwtURL(), {}, {headers: api.getHeadersForRefreshJWT()})
        .pipe(first()).subscribe(response => {
          const user = response.auth_user;
          sessionStorage.setItem('X-Auth-User', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }, () => this.POSTForLogout());
  }

  POSTForNewPassword(params: any) {
    return this.httpClient.post<any>(api.getNewPasswordURl(), params, {headers: api.getHeadersWithAuth()})
        .pipe(first()).subscribe(() => {
          localStorage.clear();
          this.currentUserSubject.next(null);
          this.router.navigate(['/auth/login']).then();
        });
  }

  POSTForCheckNewUser(params: any) {
    return this.httpClient.post<any>(api.getCheckNewUserURL(), params, {headers: api.getHeadersWithOutAuth()})
        .pipe(first());
  }

  GETForTempJWT() {
    return this.httpClient.get<any>(api.getTempJWTURl(), {headers: api.getHeadersWithOutAuth()})
        .pipe(first()).subscribe();
  }

  GETForSecretList() {
    return this.httpClient.get<any>(api.getSecretListURl(), {headers: api.getHeadersWithTempJWT()})
        .pipe(first());
  }

  POSTForStoreUserAndSecretList(list: []) {
    const user = JSON.parse(sessionStorage.getItem('X-NEW-USER'));
    this.crudService.POSTForRegister(user).subscribe(response => {
      const id = response.user_id;
      this.httpClient.post<any>(api.getStoreSecretListURl() + id, {secret_list: list}, {headers: api.getHeadersWithTempJWT()})
          .pipe(first()).subscribe(() => {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']).then();
      });
    });
  }

  GETForRandomNumbers(): Observable<any> {
    return this.crudService.GETWithOutAuth(api.getRandomNumbersURL()).pipe(first());
  }

  POSTForResetPassword(params: any): Observable<any> {
    return this.httpClient.post<any>(api.getResetPasswordURL(), params, {headers: api.getHeadersWithOutAuth()})
        .pipe(first());
  }

}
