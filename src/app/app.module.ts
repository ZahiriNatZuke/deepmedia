import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './modules/auth/auth.module';
import {VideoModule} from './modules/video/video.module';
import {SharedModule} from './modules/shared/shared.module';
import {CrudService} from './services/crud.service';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HelpersService} from './services/helpers.service';
import {VideoService} from './services/video.service';
import {AuthenticationService} from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    VideoModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    AuthenticationService,
    CrudService,
    HelpersService,
    VideoService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
