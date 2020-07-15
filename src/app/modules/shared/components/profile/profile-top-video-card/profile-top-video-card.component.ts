import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../../../../models/video';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-profile-top-video-card',
  templateUrl: './profile-top-video-card.component.html',
  styleUrls: ['./profile-top-video-card.component.scss']
})
export class ProfileTopVideoCardComponent implements OnInit {
  @Input() video: Video;
  rowHeight: number;
  heightPoster: number;
  colSpanPoster: number = 3;
  colSpanInfo: number = 2;
  inMediaQuery: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.getHeight();
    this.getPosterHeight();
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['all and (max-width: 900px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.colSpanPoster = 5;
            this.colSpanInfo = 5;
            this.inMediaQuery = true;
            $('app-profile-poster-video .btn-play').css({
              left: '39%',
              bottom: '34%',
              width: '90px',
              height: '90px',
              fontSize: '80px'
            });
          } else {
            this.colSpanPoster = 3;
            this.colSpanInfo = 2;
            this.inMediaQuery = false;
            $('app-profile-poster-video .btn-play').css({
              left: '38%',
              bottom: '35%',
              width: '90px',
              height: '90px',
              fontSize: '80px'
            });
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 1200px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            $('app-profile-poster-video .btn-play').css({
              left: '39%',
              bottom: '35%'
            });
          }
        });
    window.addEventListener('resize', () => {
      this.getHeight();
    });
  }

  getHeight() {
    this.rowHeight = window.screen.availHeight * 35 / 100;
  }

  getPosterHeight() {
    this.heightPoster = Math.floor(window.screen.availHeight * 35 / 100);
  }

}
