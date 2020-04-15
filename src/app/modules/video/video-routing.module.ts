import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VideoCategoriesComponent} from './video-categories/video-categories.component';
import {VideoViewComponent} from './video-view/video-view.component';
import {VideoCreateComponent} from './video-create/video-create.component';
import {VideoUpdateComponent} from './video-update/video-update.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {VideoListComponent} from './video-list/video-list.component';

export const VIDEO_ROUTES: Routes = [
  {path: '', redirectTo: 'categories', pathMatch: 'full'},
  {path: 'categories', component: VideoCategoriesComponent},
  {path: 'list/:category', component: VideoListComponent},
  {path: 'view/:id', component: VideoViewComponent},
  {path: 'new-video', component: VideoCreateComponent},
  {path: 'update-video/:id', component: VideoUpdateComponent},
  {path: 'favorites/:user', component: FavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(VIDEO_ROUTES)],
  exports: [RouterModule]
})
export class VideoRoutingModule {
}
