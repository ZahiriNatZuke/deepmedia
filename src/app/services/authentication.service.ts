import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "./API";
import {BehaviorSubject, Observable} from "rxjs";
import {first, map, retry} from "rxjs/operators";
import {Channel} from "../models/channel";
import {CrudService} from "./crud.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

const api = new API();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Channel>;
  public currentUser: Observable<Channel>;

  constructor(private httpClient: HttpClient, private crudService: CrudService, private snackBar: MatSnackBar, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Channel>(JSON.parse(localStorage.getItem('X-Auth-User')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Channel {
    return this.currentUserSubject.value;
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

  GETForUser() {
    return this.crudService.GETWithOutAuth(api.getUserURL(), this.currentUserValue.user.id.toString())
      .pipe(first(), retry(1)).subscribe(response => {
        const user = response.channel;
        localStorage.setItem('X-Auth-User', JSON.stringify(user));
        this.currentUserSubject.next(user);
      });
  }

  POSTForLogout() {
    return this.httpClient.post<any>(api.getLogOutURL(), {}, {headers: api.getHeadersForLogout()})
      .pipe(first(), retry(1)).subscribe(() => {
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']).then();
        this.snackBar.open('Sesión Info', 'Sesión Cerrada con Éxito', {
          duration: 2500,
          verticalPosition: "bottom",
          horizontalPosition: "end",
          panelClass: ['bg-light', 'text-dark', 'font-weight-bold']
        });
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

}
