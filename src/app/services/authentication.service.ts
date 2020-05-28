import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from './API';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map, retry} from 'rxjs/operators';
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
    this.currentUserSubject = new BehaviorSubject<Channel>(JSON.parse(localStorage.getItem('X-Auth-User')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Channel {
    return this.currentUserSubject.value;
  }

  public UpdateCurrentUserValue(channel: Channel) {
    this.currentUserSubject.next(channel);
  }

  POSTForLogin(body: { username: string, password: string }) {
    return this.httpClient.post<any>(api.getLoginURL(), body, {headers: api.getHeadersWithOutAuth()})
      .pipe(first(), retry(1), map(response => {
        const user = response['auth:user'].user;
        localStorage.setItem('X-Auth-User', JSON.stringify(user));
        localStorage.setItem('X-Authentication-JWT', response['X-Authentication-JWT']);
        localStorage.setItem('X-Encode-ID', response['X-Encode-ID']);
        localStorage.setItem('X-Refresh-JWT', response['X-Refresh-JWT']);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  POSTForLogout() {
    return this.httpClient.post<any>(api.getLogOutURL(), {}, {headers: api.getHeadersForLogout()})
      .pipe(first(), retry(1)).subscribe(() => {
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']).then();
        this.notificationService.showNotification('Sesión Info', 'Sesión Cerrada con Éxito', 'success');
      });
  }

  POSTForRefreshJWT() {
    return this.httpClient.post<any>(api.getRefreshJwtURL(), {}, {headers: api.getHeadersForRefreshJWT()})
      .pipe(retry(2), first()).subscribe(response => {
        const user = response['auth:user'].user;
        localStorage.setItem('X-Auth-User', JSON.stringify(user));
        localStorage.setItem('X-Authentication-JWT', response['X-Authentication-JWT']);
        localStorage.setItem('X-Encode-ID', response['X-Encode-ID']);
        localStorage.setItem('X-Refresh-JWT', response['X-Refresh-JWT']);
        this.currentUserSubject.next(user);
        return user;
      });
  }

  POSTForNewPassword(params: any) {
    return this.httpClient.post<any>(api.getNewPasswordURl(), params, {headers: api.getHeadersWithAuth()})
      .pipe(retry(1), first()).subscribe(() => {
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.notificationService.showNotification('Sesión Info',
          'Contraseña Actualizada.\n Inicie Sesión para actualizar los Cambios', 'success');
        this.router.navigate(['/auth/login']).then();
      });
  }

  POSTForCheckNewUser(params: any) {
    return this.httpClient.post<any>(api.getCheckNewUserURL(), params, {headers: api.getHeadersWithOutAuth()})
      .pipe(retry(1), first());
  }

  GETForTempJWT() {
    return this.httpClient.get<any>(api.getTempJWTURl(), {headers: api.getHeadersWithOutAuth()})
      .pipe(retry(1), first()).subscribe(response => {
        sessionStorage.setItem('X-TEMP-JWT', response['X-TEMP-JWT']);
      });
  }

  GETForSecretList() {
    return this.httpClient.get<any>(api.getSecretListURl(), {headers: api.getHeadersWithTempJWT()})
      .pipe(retry(1), first());
  }

  POSTForStoreUserAndSecretList(list: []) {
    const user = JSON.parse(sessionStorage.getItem('X-NEW-USER'));
    this.crudService.POSTForRegister(user).subscribe(response => {
      const id = response.user_id;
      this.httpClient.post<any>(api.getStoreSecretListURl() + id, {secret_list: list}, {headers: api.getHeadersWithTempJWT()})
        .pipe(retry(1), first()).subscribe(() => {
        this.notificationService.showNotification('Info', 'Su Cuenta ha sido Creada', 'success');
        sessionStorage.clear();
        this.router.navigate(['/auth/login']).then();
      });
    });
  }

}
