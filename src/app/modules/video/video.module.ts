import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VideoComponent} from './video.component';
import {VideoCategoriesComponent} from './video-categories/video-categories.component';
import {VideoListComponent} from './video-list/video-list.component';
import {VideoViewComponent} from './video-view/video-view.component';
import {VideoUpdateComponent} from './video-update/video-update.component';
import {VideoCreateComponent} from './video-create/video-create.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {AppRoutingModule} from '../../app-routing.module';
import {VideoRoutingModule} from './video-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    VideoComponent,
    VideoCategoriesComponent,
    VideoListComponent,
    VideoViewComponent,
    VideoUpdateComponent,
    VideoCreateComponent,
    FavoritesComponent
  ],
  exports: [
    VideoRoutingModule
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    VideoRoutingModule,
    SharedModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class VideoModule {
}
