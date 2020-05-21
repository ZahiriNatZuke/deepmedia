import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API} from '../../../../services/API';
import {CrudService} from '../../../../services/crud.service';
import {User} from '../../../../models/user';
import {Video} from '../../../../models/video';

const api = new API();

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  users: User[];
  videos: Video[];
  faTimes = faTimes;
  faSearch = faSearch;
  searchForm: FormGroup = this._formBuilder.group({
    search: ['', [Validators.required]]
  });
  foundDataUsers: boolean;
  foundDataVideo: boolean;
  URL_STORAGE = api.URL_STORAGE;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<SearchDialogComponent>,
              private _formBuilder: FormBuilder,
              private crudService: CrudService) {
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
