import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-msg-dialog',
  templateUrl: './msg-dialog.component.html',
  styleUrls: ['./msg-dialog.component.scss']
})
export class MsgDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<MsgDialogComponent>) {
  }

  ngOnInit(): void {
  }

}
