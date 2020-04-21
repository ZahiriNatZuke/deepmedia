import {Component, OnInit} from '@angular/core';
import {
  faTimes,
  faBars,
  faAngleDown,
  faAngleUp,
  faStream,
  faSignOutAlt,
  faUserAlt,
  faSlidersH,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faTimes = faTimes;
  faBars = faBars;
  faAngleDown = faAngleDown;
  faStream = faStream;
  faSlidersH = faSlidersH;
  faCircle = faCircle;
  faAngleUp = faAngleUp;
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt;
  dropdownSidebarCategories: JQuery<HTMLElement>;
  dropdownSidebarOptions: JQuery<HTMLElement>;
  mainSection: JQuery<HTMLElement>;
  toggleCategories: boolean;
  toggleOptions: boolean;
  year: number;

  constructor() {
    this.toggleCategories = false;
    this.toggleOptions = false;
    this.loadHTMLTags();
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.dropdownSidebarCategories = $('#Categories');
    this.dropdownSidebarOptions = $('#Options');
    this.dropdownSidebarCategories.slideUp(0);
    this.dropdownSidebarOptions.slideUp(0);
  }

  loadHTMLTags() {
    this.mainSection = $('.p-sidebar');
  }

  slideToggleCategories() {
    this.toggleCategories = !this.toggleCategories;
    this.toggleCategories ? this.dropdownSidebarCategories.slideDown(500) : this.dropdownSidebarCategories.slideUp(500);
    if (this.toggleOptions) {
      this.toggleOptions = !this.toggleOptions;
      this.dropdownSidebarOptions.slideUp(400);
    }
  }

  slideToggleOptions() {
    this.toggleOptions = !this.toggleOptions;
    this.toggleOptions ? this.dropdownSidebarOptions.slideDown(500) : this.dropdownSidebarOptions.slideUp(500);
    if (this.toggleCategories) {
      this.toggleCategories = !this.toggleCategories;
      this.dropdownSidebarCategories.slideUp(400);
    }
  }

  toRight() {
    this.mainSection.css({
      marginLeft: '250px',
      paddingLeft: '5px',
      transition: 'all .5s'
    });
  }

  toLeft() {
    this.mainSection.css({
      marginLeft: '70px',
      transition: 'all .5s'
    });
  }

}
