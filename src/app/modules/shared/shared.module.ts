import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WelcomeComponent} from './welcome/welcome.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {VideoCardComponent} from './video-card/video-card.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    NotFoundComponent,
    ForbiddenComponent,
    SidebarComponent,
    VideoCardComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
