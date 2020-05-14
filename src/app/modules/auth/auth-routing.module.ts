import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AnonymousGuard} from "../../guards/anonymous.guard";

export const AUTH_ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AnonymousGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard]},
  {path: 'profile/:id', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
