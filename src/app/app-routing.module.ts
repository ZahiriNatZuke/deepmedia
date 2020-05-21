import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './modules/shared/pages/welcome/welcome.component';
import {NotFoundComponent} from './modules/shared/pages/not-found/not-found.component';
import {AuthComponent} from './modules/auth/auth.component';
import {VideoComponent} from './modules/video/video.component';
import {ForbiddenComponent} from './modules/shared/pages/forbidden/forbidden.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: WelcomeComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: './modules/auth/auth-routing.module#AuthRoutingModule'
  }, {
    path: 'video',
    component: VideoComponent,
    loadChildren: './modules/video/video-routing.module#VideoRoutingModule'
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**', redirectTo: 'not-found', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
