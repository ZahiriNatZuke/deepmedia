import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserInfo} from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userInfo: UserInfo = JSON.parse(sessionStorage.getItem('X-NEW-USER'));
    const jwtTemp: string = sessionStorage.getItem('X-Temp-JWT');
    if (typeof userInfo === 'object' && userInfo !== null && userInfo !== undefined
        && jwtTemp !== null && jwtTemp !== undefined && jwtTemp.split('.').length === 3) {
      return true;
    }
    this.router.navigate(['/forbidden']).then();
    return false;
  }
}
