import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WelcomeComponent} from './welcome/welcome.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {VideoCardComponent} from './video-card/video-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {CategoryCardComponent} from './category-card/category-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {ProfileCardComponent} from './profile/profile-card/profile-card.component';
import {ProfileFormComponent} from './profile/profile-form/profile-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProfileListInfoComponent} from './profile/profile-list-info/profile-list-info.component';
import { ProfileTopVideoCardComponent } from './profile/profile-top-video-card/profile-top-video-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProfileVideoCardComponent } from './profile/profile-video-card/profile-video-card.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    NotFoundComponent,
    ForbiddenComponent,
    SidebarComponent,
    VideoCardComponent,
    CategoryCardComponent,
    ProfileCardComponent,
    ProfileFormComponent,
    ProfileListInfoComponent,
    ProfileTopVideoCardComponent,
    ProfileVideoCardComponent
  ],
  exports: [
    WelcomeComponent,
    NotFoundComponent,
    ForbiddenComponent,
    SidebarComponent,
    VideoCardComponent,
    CategoryCardComponent,
    ProfileFormComponent,
    ProfileCardComponent,
    ProfileTopVideoCardComponent,
    ProfileVideoCardComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatGridListModule
  ]
})
export class SharedModule {
}
