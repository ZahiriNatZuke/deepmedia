import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.scss']
})
export class VideoCreateComponent implements OnInit {

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('#DeepMedia | Nuevo Video');
  }

}
