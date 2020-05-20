import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WelcomeComponent} from './pages/welcome/welcome.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {ForbiddenComponent} from './pages/forbidden/forbidden.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {VideoCardComponent} from './components/video-card/video-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {CategoryCardComponent} from './components/category-card/category-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {ProfileCardComponent} from './components/profile/profile-card/profile-card.component';
import {ProfileFormComponent} from './components/profile/profile-form/profile-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProfileListInfoComponent} from './components/profile/profile-list-info/profile-list-info.component';
import {ProfileTopVideoCardComponent} from './components/profile/profile-top-video-card/profile-top-video-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ProfileVideoCardComponent} from './components/profile/profile-video-card/profile-video-card.component';
import {MsgDialogComponent} from './dialogs/msg-dialog/msg-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import {MatSliderModule} from '@angular/material/slider';
import {TimerPipe} from './pipes/timer.pipe';
import {ProfilePosterVideoComponent} from './components/profile/profile-poster-video/profile-poster-video.component';
import {VideoFormStepperComponent} from './components/video-form-stepper/video-form-stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {SaveDomPipe} from './pipes/save-dom.pipe';
import {CommentsComponent} from './components/view-video/comments/comments.component';
import {SearchDialogComponent} from './dialogs/search-dialog/search-dialog.component';
import {FavoriteTableComponent} from './components/favorite-table/favorite-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PlayListComponent} from './components/view-video/play-list/play-list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TopCarouselComponent} from './components/view-video/top-carousel/top-carousel.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {VideoFormStepperUpdateComponent} from './components/video-form-stepper-update/video-form-stepper-update.component';

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
    ProfileVideoCardComponent,
    MsgDialogComponent,
    VideoPlayerComponent,
    TimerPipe,
    ProfilePosterVideoComponent,
    VideoFormStepperComponent,
    SaveDomPipe,
    CommentsComponent,
    SearchDialogComponent,
    FavoriteTableComponent,
    PlayListComponent,
    TopCarouselComponent,
    VideoFormStepperUpdateComponent
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
    ProfileVideoCardComponent,
    TimerPipe,
    VideoFormStepperComponent,
    FavoriteTableComponent,
    VideoPlayerComponent,
    CommentsComponent,
    PlayListComponent,
    ProfilePosterVideoComponent,
    TopCarouselComponent,
    VideoFormStepperUpdateComponent,
    SaveDomPipe
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
    MatGridListModule,
    MatDialogModule,
    MatSliderModule,
    CdkStepperModule,
    MatStepperModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DragDropModule,
    ScrollingModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {
}
