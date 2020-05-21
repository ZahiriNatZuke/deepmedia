import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
  faAngleDown,
  faAngleUp,
  faBars,
  faCircle,
  faCogs,
  faSignInAlt,
  faSignOutAlt,
  faStream,
  faTimes,
  faUserAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../../environments/environment.prod';
import {SearchDialogComponent} from '../../dialogs/search-dialog/search-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {HelpersService} from '../../../../services/helpers.service';
import {Channel} from '../../../../models/channel';
import {AuthenticationService} from '../../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  faTimes = faTimes;
  faBars = faBars;
  faAngleDown = faAngleDown;
  faStream = faStream;
  faCogs = faCogs;
  faCircle = faCircle;
  faAngleUp = faAngleUp;
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  dropdownSidebarCategories: JQuery<HTMLElement>;
  dropdownSidebarOptions: JQuery<HTMLElement>;
  mainSection: JQuery<HTMLElement>;
  inputCheck: HTMLInputElement;
  toggleCategories: boolean;
  toggleOptions: boolean;
  year: number;
  URL_ASSETS = environment.URL_ASSETS;
  URL_STORAGE = environment.URL_STORAGE;
  User_Channel: Channel;
  UnknownUserAvatar: string;

  constructor(public dialog: MatDialog,
              private router: Router,
              private helpersService: HelpersService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.toggleCategories = false;
    this.toggleOptions = false;
    this.loadHTMLTags();
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.UnknownUserAvatar = this.helpersService.getUnknownUserAvatar();
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.code === 'KeyF') {
        event.preventDefault();
        this.openDialog();
      }
    });
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
    environment.expandedSidebar = true;
    this.mainSection.css({
      marginLeft: '250px',
      paddingLeft: '5px',
      transition: 'all .5s'
    });
  }

  toLeft() {
    environment.expandedSidebar = false;
    this.mainSection.css({
      marginLeft: '70px',
      transition: 'all .5s'
    });
  }

  openDialog(): void {
    if (environment.expandedSidebar) {
      this.inputCheck.checked = false;
      this.toLeft();
    }
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '100%',
      maxHeight: '550px',
      autoFocus: true,
      role: 'dialog',
      position: {
        top: '40px',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  ngAfterViewInit(): void {
    this.inputCheck = document.getElementById('check') as HTMLInputElement;
  }

  makeLogout() {
    this.authenticationService.POSTForLogout();
  }
}
