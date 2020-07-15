import {Component, OnInit} from '@angular/core';
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
    return (window.screen.availHeight * 52.5 / 100);
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
    $('#buttonClose').fadeToggle(450);
    $('#all-videos').fadeToggle(450);
    setTimeout(() => {
      $('mat-accordion').fadeToggle(700);
      setTimeout(() => {
        $('.d-flex.justify-content-center button').fadeToggle(200);
        $('#toggleForm').fadeToggle(200);
      }, 200);
    }, 500);
  }

  getActionsHeight() {
    this.actionsHeight = Math.floor(window.screen.availHeight * 21 / 100);
  }

  AfterViewInit(): void {
    $('#buttonClose').fadeOut(0);
    const profileAvatar = document.getElementById('profile-avatar') as HTMLElement;
    if (profileAvatar && this.Channel) {
      this.Avatar = profileAvatar;
      profileAvatar.style.background = `url('${this.URL_STORAGE + this.Channel.avatar.path}') center / cover`;
      profileAvatar.style.transition = 'all .4s ease';
    } else {
      setTimeout(() => this.AfterViewInit(), 200);
    }
  }

  getToggleSidebar(): boolean {
    return environment.expandedSidebar;
  }

  showMoreInfo() {
    this.moreStats = !this.moreStats;
  }

}
