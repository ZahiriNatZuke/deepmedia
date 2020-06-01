import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import {faFileDownload} from '@fortawesome/free-solid-svg-icons';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {API} from '../../../../services/API';

const api = new API();

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.scss']
})
export class DownloadDialogComponent implements OnInit {
  faFileDownload = faFileDownload;
  saving: boolean;
  started: boolean;
  currentLoad: number;
  totalLoad: number;
  percent: number;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data,
              private httpClient: HttpClient) {
    this.saving = false;
    this.started = false;
    this.httpClient.get(api.getDownloadVideoURL(data.id), {
      reportProgress: true,
      responseType: 'blob',
      observe: 'events'
    }).subscribe(blob => {
      switch (blob.type) {
        case HttpEventType.Sent:
          this.started = true;
          break;

        case HttpEventType.DownloadProgress:
          this.percent = Math.round(100 * blob.loaded / blob.total);
          this.currentLoad = blob.loaded;
          this.totalLoad = blob.total;
          break;

        case HttpEventType.Response:
          this.saving = true;
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob.body);
          link.download = data.title;
          link.click();
          setTimeout(() => data.from.snackDownload.dismiss(), 3000);
          break;

        default:
          break;
      }
    });
  }

  ngOnInit(): void {
  }

}
