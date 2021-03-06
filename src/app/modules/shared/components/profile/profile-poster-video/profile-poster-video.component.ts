import {Component, Input, OnInit} from '@angular/core';
import {faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Channel} from '../../../../../models/channel';
import {Video} from '../../../../../models/video';
import {environment} from '../../../../../../environments/environment.prod';
import {VideoService} from '../../../../../services/video.service';
import {Router} from '@angular/router';
import {ThemeConfigService} from '../../../../../services/theme-config.service';

@Component({
  selector: 'app-profile-poster-video',
  templateUrl: './profile-poster-video.component.html',
  styleUrls: ['./profile-poster-video.component.scss']
})
export class ProfilePosterVideoComponent implements OnInit {
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  @Input() video: Video;
  @Input() heightPoster: number;
  User_Channel: Channel;
  URL_STORAGE: string = environment.URL_STORAGE;
  currentTheme: { theme: string } = this.themeConfigService.config;

  constructor(private authenticationService: AuthenticationService,
              private videoService: VideoService,
              private router: Router,
              private themeConfigService: ThemeConfigService) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
  }

  ngOnInit(): void {
  }

  isFavorite(): boolean {
    if (this.User_Channel)
      return this.video.favorite_for_who.map(channel => channel.id).includes(this.User_Channel.id);
    else
      return false;
  }

  goToVideo() {
    this.videoService.UpdateCurrentVideoValue(this.video);
    this.videoService.UpdateCurrentVideoPlayerValue({
      id: this.video.id,
      poster: this.URL_STORAGE + this.video.poster.path,
      video: this.URL_STORAGE + this.video.video.path,
      type: this.video.type
    });
    this.router.navigate(['/video/view', this.video.id]).then();
  }
}
