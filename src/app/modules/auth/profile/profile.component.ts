import {Component, OnDestroy, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../environments/environment.prod';
import {Channel} from '../../../models/channel';
import {Video} from '../../../models/video';
import {API} from '../../../services/API';
import {HelpersService} from '../../../services/helpers.service';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../../../services/crud.service';

const api = new API();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  step = 0;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  toggleForm: JQuery<HTMLElement>;
  Profile: JQuery<HTMLElement>;
  progressBar: JQuery<HTMLElement>;
  Channel: Channel;
  rowHeight: number;
  Videos: Video[];
  byViews: Video;
  byLikes: Video;
  byDownload: Video;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private helpersService: HelpersService,
              private crudService: CrudService) {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.crudService.GETWithOutAuth(api.getTopVideoByChannelURL(), id)
        .subscribe(response => {
          this.byViews = response.byViews;
          this.byLikes = response.byLikes;
          this.byDownload = response.byDownload;
        });
      this.helpersService.GETChannelById(id);
      this.helpersService.GETStatsOfChannelById(id);
    });
    this.getHeight();
  }

  ngOnInit(): void {
    this.Profile = $('mat-grid-list:first');
    this.Profile.hide(0);
    this.progressBar = $('.progress-bar-znz mat-progress-bar');
    this.toggleForm = $('#toggleForm');
    $('app-profile-form').fadeToggle(0);
    $('#all-videos').fadeToggle(0);
    window.addEventListener('resize', () => this.getHeight());
    this.getChannel();
  }

  getHeight() {
    this.rowHeight = window.screen.availHeight * 80 / 100;
  }

  showAllVideos() {
    environment.allVideos = true;
    $('mat-accordion').fadeToggle(400);
    setTimeout(() => {
      $('.f-title-card').css({
        font: '300 22px/40px Roboto, "Helvetica Neue", sans-serif',
        transition: 'all .3s'
      });
      $('.d-flex.justify-content-center button').toggleClass('d-none');
    }, 425);
    setTimeout(() => {
      $('#all-videos').fadeToggle(500);
      $('#buttonClose').toggleClass('d-none');
    }, 550);
  }

  getChannel() {
    if (this.helpersService.currentChannelValue) {
      this.helpersService.currentChannel.subscribe(channel => this.Channel = channel);
      this.Videos = this.Channel.videos;
      this.showProfile();
    } else {
      setTimeout(() => this.getChannel(), 200);
    }
  }

  showProfile() {
    if (this.Channel) {
      setTimeout(() => {
        this.progressBar.toggle(400);
        this.Profile.fadeToggle(650);
      }, 350);
    } else {
      setTimeout(() => this.showProfile(), 200);
    }
  }

  ngOnDestroy(): void {
    this.helpersService.UpdateChannel(null);
    this.helpersService.UpdateStatsChannel(null);
  }

}
