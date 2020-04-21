import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './modules/shared/welcome/welcome.component';
import {NotFoundComponent} from './modules/shared/not-found/not-found.component';
import {AuthComponent} from './modules/auth/auth.component';
import {VideoComponent} from './modules/video/video.component';
import {ApplicationsComponent} from './modules/shared/applications/applications.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: WelcomeComponent
  },
  {
    path: 'aplicaciones',
    component: ApplicationsComponent
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
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
