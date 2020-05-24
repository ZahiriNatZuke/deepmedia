import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faComment, faEye, faPlayCircle, faStar, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {Video} from '../../../../../models/video';
import {environment} from '../../../../../../environments/environment.prod';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Channel} from '../../../../../models/channel';
import {VideoService} from '../../../../../services/video.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-video-card',
  templateUrl: './profile-video-card.component.html',
  styleUrls: ['./profile-video-card.component.scss']
})
export class ProfileVideoCardComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  @Output() linkToPlay: EventEmitter<boolean>;
  @Input() Video: Video;
  URL_STORAGE: string = environment.URL_STORAGE;
  User_Channel: Channel;

  constructor(private authenticationService: AuthenticationService,
              private videoService: VideoService,
              private router: Router) {
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
    this.videoService.UpdateCurrentVideoValue(null);
    this.videoService.UpdateCurrentVideoPlayerValue(null);
    this.router.navigate(['/video/view', this.Video.id]).then();
  }

}
