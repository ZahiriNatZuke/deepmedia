import {Component, OnInit} from '@angular/core';
import {
  faTimes,
  faBars,
  faQrcode,
  faLink,
  faAngleDown,
  faStream,
  faCalendarWeek,
  faQuestionCircle,
  faSlidersH,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faTimes = faTimes;
  faBars = faBars;
  faQrcode = faQrcode;
  faLink = faLink;
  faAngleDown = faAngleDown;
  faStream = faStream;
  faCalendarWeek = faCalendarWeek;
  faQuestionCircle = faQuestionCircle;
  faSlidersH = faSlidersH;
  faEnvelope = faEnvelope;
  infoTextTitle: any;
  dropdownSidebar: any;
  mainSection: any;
  userImg: any;
  titleCard: any;
  infoUser: any;

  constructor() {
  }

  ngOnInit(): void {
    this.dropdownSidebar = $('.dropdown-sidebar');
    this.dropdownSidebar.slideToggle(0);
    this.infoTextTitle = $('.info-text-title');
    this.mainSection = $('.p-sidebar');
    this.infoUser = $('.p-data');
    this.userImg = $('.user-img');
    this.titleCard = $('.f-title-card');
  }

  slideToggle() {
    this.dropdownSidebar.slideToggle(500);
  }

  toRight() {
    this.mainSection.css({
      marginLeft: '250px',
      paddingLeft: '5px',
      transition: 'all .5s'
    });
    this.infoTextTitle.css({
      fontSize: '16px',
      transition: 'all 0.5s'
    });
    this.titleCard.css({
      fontSize: '24px',
      transition: 'all 0.3s'
    });
    this.infoUser.css({
      position: 'relative',
      paddingLeft: '26%',
      transition: 'all .4s'
    });
  }

  toLeft() {
    this.mainSection.css({
      marginLeft: '70px',
      transition: 'all .5s'
    });
    this.infoTextTitle.css({
      fontSize: '20px',
      transition: 'all 0.5s'
    });
    this.titleCard.css({
      fontSize: '28px',
      transition: 'all 0.3s'
    });
    this.infoUser.css({
      position: 'relative',
      paddingLeft: '34%',
      transition: 'all .4s'
    });
  }
}
