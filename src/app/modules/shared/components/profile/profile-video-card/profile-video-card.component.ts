import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import {Video} from '../../../../../models/video';
import {environment} from '../../../../../../environments/environment.prod';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Channel} from '../../../../../models/channel';
import {VideoService} from '../../../../../services/video.service';
import {Router} from '@angular/router';
import {ThemeConfigService} from '../../../../../services/theme-config.service';

@Component({
  selector: 'app-profile-video-card',
  templateUrl: './profile-video-card.component.html',
  styleUrls: ['./profile-video-card.component.scss']
})
export class ProfileVideoCardComponent implements OnInit {
  @Output() linkToPlay: EventEmitter<boolean>;
  @Input() Video: Video;
  User_Channel: Channel;
  URL_STORAGE: string = environment.URL_STORAGE;
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  currentTheme: { theme: string } = this.themeConfigService.config;

  constructor(private authenticationService: AuthenticationService,
              private videoService: VideoService,
              private router: Router,
              private themeConfigService: ThemeConfigService) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.linkToPlay = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  emitPlayVideo() {
    this.linkToPlay.emit(true);
  }

  isFavorite(): boolean {
    if (this.User_Channel)
      return this.Video.favorite_for_who.map(channel => channel.id).includes(this.User_Channel.id);
    else
      return false;
  }

  goToVideo() {
    this.videoService.UpdateCurrentVideoValue(this.Video);
    this.videoService.UpdateCurrentVideoPlayerValue({
      id: this.Video.id,
      poster: this.URL_STORAGE + this.Video.poster.path,
      video: this.URL_STORAGE + this.Video.video.path,
      type: this.Video.type
    });
    this.router.navigate(['/video/view', this.Video.id]).then();
  }

}
