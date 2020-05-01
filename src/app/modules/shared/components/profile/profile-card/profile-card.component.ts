import {Component, OnInit} from '@angular/core';
import {faThumbsUp, faComment, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../../../environments/environment.prod';

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

  constructor() {
    this.moreStats = false;
    this.getActionsHeight();
  }

  ngOnInit(): void {
    console.log(Math.floor(window.screen.availHeight * 20.5 / 100));
    $(`.mh-profile`).css({
      background: `url('${this.getPath('profile-img.jpeg')}') center`,
      backgroundSize: 'cover'
    });

    $('.mh-profile').css({
      minHeight: this.getHeightImg() + 'px',
      maxHeight: (this.getHeightImg() + 25) + 'px',
    });
    window.addEventListener('resize', () => this.getActionsHeight());
  }

  getHeightImg() {
    return (window.screen.availHeight * 45 / 100);
  }

  getPath(img: string): string {
    return `../../../../../assets/img/${img}`;
  }

  toggleForm() {
    this.form = !this.form;
    const rightSide = $('#right-side');
    this.form ? rightSide.removeClass('mat-elevation-z10') : rightSide.addClass('mat-elevation-z10');
    const buttonClose = $('#buttonClose');
    this.form ? buttonClose.fadeOut(200) : (environment.allVideos ? buttonClose.fadeIn(200) : buttonClose.fadeOut(0));
    $('#right-card').fadeToggle(400);
    setTimeout(() => {
      $('app-profile-form').fadeToggle(600);
    }, 400);
  }

  closeAllVideos() {
    environment.allVideos = false;
    $('#buttonClose').fadeToggle(400);
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
