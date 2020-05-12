import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../environments/environment.prod';
import {Channel} from "../../../models/channel";
import {Video} from "../../../models/video";
import {ActivatedRoute} from "@angular/router";
import {CrudService} from "../../../services/crud.service";
import {API} from "../../../services/API";

const api = new API();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  step = 0;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  toggleForm: JQuery<HTMLElement>;
  Profile: JQuery<HTMLElement>;
  progressBar: JQuery<HTMLElement>;
  Channel: Channel;
  videoArray: { id: number, video: string }[] = [
    {
      id: 1,
      video: 'video.mp4'
    },
    {
      id: 2,
      video: 'video1.mp4'
    },
    {
      id: 3,
      video: 'video1.mp4'
    }
  ];
  rowHeight: number;
  Videos: Video[];

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private activatedRoute: ActivatedRoute, private crudService: CrudService) {
    this.getHeight();
  }

  ngOnInit(): void {
    this.Profile = $('mat-grid-list:first');
    this.Profile.hide(0);
    this.progressBar = $('mat-progress-bar');
    this.toggleForm = $('#toggleForm');
    $('app-profile-form').fadeToggle(0);
    $('#all-videos').fadeToggle(0);
    window.addEventListener('resize', () => {
      this.getHeight();
    });
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

  getChannel(event: Channel): void {
    this.Channel = event;
    this.Videos = this.Channel.videos;
    this.progressBar.toggle(400);
    this.Profile.fadeToggle(650);
  }

  updateChannel(event: boolean) {
    if (event) {
      this.activatedRoute.params.subscribe(params => {
        const id = params.id;
        this.crudService.GETWithOutAuth(api.getChannelURL(), id)
          .subscribe(response => {
            this.Channel = response.channel;
          });
      });
    }
  }
}
