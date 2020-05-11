import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {
  faTimes,
  faBars,
  faAngleDown,
  faAngleUp,
  faStream,
  faSignOutAlt,
  faUserAlt,
  faCogs,
  faCircle,
  faSignInAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../../environments/environment.prod';
import {SearchDialogComponent} from '../../dialogs/search-dialog/search-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {HelpersService} from "../../../../services/helpers.service";
import {Channel} from "../../../../models/channel";
import {CrudService} from "../../../../services/crud.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
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
  status_login: boolean = false;
  UnknownUserAvatar: string;
  checkStatusLogin: any;

  constructor(public dialog: MatDialog,
              private helpersService: HelpersService,
              private crudService: CrudService) {
    this.toggleCategories = false;
    this.toggleOptions = false;
    this.loadHTMLTags();
    this.year = new Date().getFullYear();
    this.checkStatusLogin = setInterval(() => {
      this.statusLogin();
    }, 250);
  }

  ngOnInit(): void {
    this.statusLogin();
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

  statusLogin() {
    this.helpersService.getAuthUser().subscribe(resolve => {
      this.User_Channel = resolve;
      if (this.User_Channel) {
        this.status_login = true;
      }
    });
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

  ngOnDestroy(): void {
    clearInterval(this.checkStatusLogin);
  }

  makeLogout() {
    this.crudService.POSTLogout().subscribe(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.status_login = false;
    });
  }
}
