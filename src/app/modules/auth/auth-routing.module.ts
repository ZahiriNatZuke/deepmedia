import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AnonymousGuard} from '../../guards/anonymous.guard';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {SecretListComponent} from './secret-list/secret-list.component';
import {AuthGuard} from '../../guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AnonymousGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard]},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'new-password', component: NewPasswordComponent, canActivate: [AuthGuard]},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard]},
  {path: 'secret-list', component: SecretListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
