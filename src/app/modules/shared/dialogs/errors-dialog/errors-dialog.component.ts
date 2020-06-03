import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-errors-dialog',
  templateUrl: './errors-dialog.component.html',
  styleUrls: ['./errors-dialog.component.scss']
})
export class ErrorsDialogComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { from: string, errors: string[], status: string }) {
  }

  ngOnInit(): void {
  }

}
