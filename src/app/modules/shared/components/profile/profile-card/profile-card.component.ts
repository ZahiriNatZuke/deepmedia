import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faThumbsUp, faComment, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../../../environments/environment.prod';
import {Channel} from "../../../../../models/channel";
import {ActivatedRoute} from "@angular/router";
import {CrudService} from "../../../../../services/crud.service";
import {API} from "../../../../../services/API";
import {Stats} from "../../../../../models/stats";

const api = new API();
const URL_STORAGE = environment.URL_STORAGE;

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, AfterViewInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faTimes = faTimes;
  form: boolean;
  moreStats: boolean;
  actionsHeight: number;
  Channel: Channel;
  @Output() ChannelEmitter: EventEmitter<Channel> = new EventEmitter<Channel>();
  response_status: boolean;
  statsChannel: Stats;

  constructor(private activatedRoute: ActivatedRoute, private crudService: CrudService) {
    this.response_status = false;
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.crudService.GETWithOutAuth(api.getChannelURL(), id)
        .subscribe(response => {
          this.Channel = response.channel;
          this.statsChannel = response.stats;
          this.ChannelEmitter.emit(response.channel);
          this.response_status = true;
        });
    });
    this.moreStats = false;
    this.getActionsHeight();
  }

  ngOnInit(): void {
    this.displayAvatar();
    window.addEventListener('resize', () => this.getActionsHeight());
  }

  displayAvatar() {
    if (this.statsChannel) {
      $(`.mh-profile`).css({
        background: `url("${URL_STORAGE}${this.Channel.avatar.path}") center / cover`
      });
    } else {
      setTimeout(() => this.displayAvatar(), 200);
    }
  }

  ngAfterViewInit(): void {
    //
  }

  getHeightImg() {
    return (window.screen.availHeight * 45 / 100);
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
