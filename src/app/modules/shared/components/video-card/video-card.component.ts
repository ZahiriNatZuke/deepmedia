import {Component, Input, OnInit} from '@angular/core';
import {faComment, faEye, faPlayCircle, faStar, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {Video} from '../../../../models/video';
import {environment} from '../../../../../environments/environment.prod';
import {AuthenticationService} from '../../../../services/authentication.service';
import {Channel} from '../../../../models/channel';
import {VideoService} from '../../../../services/video.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  @Input() video: Video;
  URL_STORAGE = environment.URL_STORAGE;
  User_Channel: Channel;

  constructor(private authenticationService: AuthenticationService,
              private videoService: VideoService,
              private router: Router) {
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
