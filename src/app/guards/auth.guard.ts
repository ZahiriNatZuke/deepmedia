import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree, Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authenticationService.currentUserValue;
    if (user) {
      return true;
    }
    this.snackBar.open('Sesión Info', 'Por Favor Autentíquese', {
      duration: 2500,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      panelClass: ['bg-light', 'text-dark', 'font-weight-bold']
    });
    this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}}).then();
    return false;
  }

}
