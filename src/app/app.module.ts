import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './modules/auth/auth.module';
import {VideoModule} from './modules/video/video.module';
import {SharedModule} from './modules/shared/shared.module';
import {CrudService} from './services/crud.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HelpersService} from './services/helpers.service';
import {VideoService} from './services/video.service';
import {AuthenticationService} from './services/authentication.service';
import {HttpErrorInterceptor} from './interceptors/http.error.interceptor';
import {HttpSecurityInterceptor} from './interceptors/http.security.interceptor';
import {MatRippleModule} from '@angular/material/core';
import {ThemeConfigService} from './services/theme-config.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
    MatSnackBarModule,
    MatRippleModule,
    DragDropModule
  ],
  providers: [
    AuthenticationService,
    CrudService,
    HelpersService,
    VideoService,
    ThemeConfigService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpSecurityInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
