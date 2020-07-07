import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VideoCategoriesComponent} from './video-categories/video-categories.component';
import {VideoViewComponent} from './video-view/video-view.component';
import {VideoCreateComponent} from './video-create/video-create.component';
import {VideoUpdateComponent} from './video-update/video-update.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {VideoListComponent} from './video-list/video-list.component';
import {AuthGuard} from '../../guards/auth.guard';

export const VIDEO_ROUTES: Routes = [
  {path: '', redirectTo: 'categories', pathMatch: 'full'},
  {path: 'categories', component: VideoCategoriesComponent},
  {path: 'list/:category', component: VideoListComponent},
  {path: 'view/:id', component: VideoViewComponent},
  {path: 'new-video', component: VideoCreateComponent, canActivate: [AuthGuard]},
  {path: 'update-video/:id', component: VideoUpdateComponent, canActivate: [AuthGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(VIDEO_ROUTES)],
  exports: [RouterModule]
})
export class VideoRoutingModule {
}
