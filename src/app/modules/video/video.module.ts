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


@NgModule({
  declarations: [
    VideoComponent,
    VideoCategoriesComponent,
    VideoListComponent,
    VideoViewComponent,
    VideoUpdateComponent,
    VideoCreateComponent,
    FavoritesComponent,],
  imports: [
    CommonModule,
    AppRoutingModule,
    VideoRoutingModule
  ]
})
export class VideoModule {
}
