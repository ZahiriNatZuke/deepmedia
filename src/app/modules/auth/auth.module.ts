import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AppRoutingModule} from '../../app-routing.module';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  exports: [
    AuthRoutingModule
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AuthRoutingModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    FontAwesomeModule,
    ScrollingModule,
    MatTooltipModule,
  ]
})
export class AuthModule {
}
