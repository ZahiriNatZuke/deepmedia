import {Component, OnInit} from '@angular/core';
import {faComment, faEye, faThumbsUp, faTimes} from '@fortawesome/free-solid-svg-icons';
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
  User_Channel: Channel;
  Channel: Channel;
  Avatar: HTMLElement;
  statsChannel: Stats;
  URL_STORAGE = environment.URL_STORAGE;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faTimes = faTimes;
  form: boolean;
  moreStats: boolean;
  actionsHeight: number;

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
    this.AfterViewInit();
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
      this.helpersService.currentStatsChannel.subscribe(stats => this.statsChannel = stats);
    } else {
      setTimeout(() => this.getStats(), 200);
    }
  }

  getHeightImg() {
    return (window.screen.availHeight * 45 / 100);
  }

  toggleForm() {
    this.form = !this.form;
    const rightSide = $('#right-side');
    if (!this.form) this.AfterViewInit();
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
          transition: 'all .4s ease'
        });
        $('.d-flex.justify-content-center button').toggleClass('d-none');
      }, 200);
    }, 500);
  }

  getActionsHeight() {
    this.actionsHeight = Math.floor(window.screen.availHeight * 21 / 100);
  }

  AfterViewInit(): void {
    const profileAvatar = document.getElementById('profile-avatar') as HTMLElement;
    if (profileAvatar && this.Channel) {
      this.Avatar = profileAvatar;
      profileAvatar.style.background = `url('${this.URL_STORAGE + this.Channel.avatar.path}') center / cover`;
      profileAvatar.style.transition = 'all .4s ease';
    } else {
      setTimeout(() => this.AfterViewInit(), 200);
    }
  }
}
