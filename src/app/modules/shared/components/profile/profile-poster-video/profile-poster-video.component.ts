import {Component, Input, OnInit} from '@angular/core';
import {faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Channel} from '../../../../../models/channel';
import {Video} from '../../../../../models/video';
import {environment} from '../../../../../../environments/environment.prod';

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

  constructor(private authenticationService: AuthenticationService) {
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

}
