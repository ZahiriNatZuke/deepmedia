import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {faSearch, faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API} from '../../../../services/API';
import {CrudService} from '../../../../services/crud.service';
import {User} from '../../../../models/user';
import {Video} from '../../../../models/video';
import {AuthenticationService} from '../../../../services/authentication.service';
import {Channel} from '../../../../models/channel';
import {ThemeConfigService} from '../../../../services/theme-config.service';

const api = new API();

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  users: User[];
  videos: Video[];
  faSearch = faSearch;
  faUserAlt = faUserAlt;
  searchForm: FormGroup = this._formBuilder.group({
    search: ['', [Validators.required]]
  });
  foundDataUsers: boolean;
  foundDataVideo: boolean;
  URL_STORAGE = api.URL_STORAGE;
  User_Channel: Channel;
  currentTheme: { theme: string } = this.themeConfigService.config;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<SearchDialogComponent>,
              private _formBuilder: FormBuilder,
              private crudService: CrudService,
              private authenticationService: AuthenticationService,
              private themeConfigService: ThemeConfigService) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.foundDataVideo = null;
    this.foundDataUsers = null;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  OnSubmit() {
    if (this.searchForm.get('search').value.trim() !== '')
      this.crudService.GETWithOutAuth(api.getSearchURL(), this.searchForm.get('search').value.trim())
          .subscribe(response => {
            this.users = response.users;
            this.videos = response.videos;
            this.foundDataUsers = response.users.length > 0;
            this.foundDataVideo = response.videos.length > 0;
          });
  }
}
