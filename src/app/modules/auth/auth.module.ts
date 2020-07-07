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
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SecretListComponent} from './secret-list/secret-list.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SecretListComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
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
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    FormsModule,
    ClipboardModule,
    MatIconModule
  ]
})
export class AuthModule {
}
