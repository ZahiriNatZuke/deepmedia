import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyDataSource} from '../../../auth/profile/profile.component';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDialogComponent implements OnInit {
  faTimes = faTimes;
  faSearch = faSearch;
  searchForm: FormGroup = this._formBuilder.group({
    search: ['', [Validators.required]]
  });
  ds: MyDataSource = new MyDataSource();
  foundData: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<SearchDialogComponent>,
              private _formBuilder: FormBuilder) {
    this.foundData = null;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  OnSubmit() {
    if (this.searchForm.valid) {
      this.foundData = true;
      console.log(this.searchForm.value);
    } else {
      this.foundData = false;
    }
  }
}
