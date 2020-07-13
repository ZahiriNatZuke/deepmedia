import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-video-update',
  templateUrl: './video-update.component.html',
  styleUrls: ['./video-update.component.scss']
})
export class VideoUpdateComponent implements OnInit {

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('#DeepMedia | Editar Video');
  }

}
