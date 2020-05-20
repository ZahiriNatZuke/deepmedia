import {Component, OnInit} from '@angular/core';
import {faThumbsUp, faComment, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../../../environments/environment.prod';
import {Channel} from '../../../../../models/channel';
import {ActivatedRoute} from '@angular/router';
import {Stats} from '../../../../../models/stats';
import {HelpersService} from '../../../../../services/helpers.service';
import {AuthenticationService} from '../../../../../services/authentication.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faTimes = faTimes;
  form: boolean;
  moreStats: boolean;
  actionsHeight: number;
  Channel: Channel;
  statsChannel: Stats;
  URL_STORAGE = environment.URL_STORAGE;
  User_Channel: Channel;

  constructor(private activatedRoute: ActivatedRoute,
              private helpersService: HelpersService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.moreStats = false;
    this.getActionsHeight();
  }

  ngOnInit(): void {
    this.getChannel();
    this.getStats();
    window.addEventListener('resize', () => this.getActionsHeight());
  }

  getChannel() {
    if (this.helpersService.currentChannelValue) {
      this.helpersService.currentChannel.subscribe(channel => this.Channel = channel);
    } else {
      setTimeout(() => this.getChannel(), 200);
    }
  }

  getStats() {
    if (this.helpersService.currentStatsChannelValue) {
      this.helpersService.currentStatsChannel.subscribe(stats => {
        this.statsChannel = stats;
      });
    } else {
      setTimeout(() => this.getStats(), 200);
    }
  }

  getHeightImg() {
    return (window.screen.availHeight * 42 / 100);
  }

  toggleForm() {
    this.form = !this.form;
    const rightSide = $('#right-side');
    this.form ?
      rightSide.removeClass('mat-elevation-z10') : rightSide.addClass('mat-elevation-z10');
    const buttonClose = $('#buttonClose');
    this.form ?
      buttonClose.fadeOut(200) : (environment.allVideos ?
      buttonClose.fadeIn(200) : buttonClose.fadeOut(0));
    $('#right-card').fadeToggle(400);
    setTimeout(() => {
      $('app-profile-form').fadeToggle(600);
    }, 400);
  }

  closeAllVideos() {
    environment.allVideos = false;
    $('#buttonClose').toggleClass('d-none');
    $('#all-videos').fadeToggle(450);
    setTimeout(() => {
      $('mat-accordion').fadeToggle(700);
      setTimeout(() => {
        $('.f-title-card').css({
          font: '300 24px/40px Roboto, "Helvetica Neue", sans-serif',
          transition: 'all .3s'
        });
        $('.d-flex.justify-content-center button').toggleClass('d-none');
      }, 200);
    }, 500);
  }

  getActionsHeight() {
    this.actionsHeight = Math.floor(window.screen.availHeight * 21 / 100);
  }
}
