import {Component, OnInit} from '@angular/core';
import {CrudService} from "../../../services/crud.service";
import {API} from "../../../services/API";
import {ActivatedRoute} from "@angular/router";
import {Video} from "../../../models/video";

const api = new API();

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  public videos: Video[];
  progressBar: JQuery<HTMLElement>;
  cardColumn: JQuery<HTMLElement>;

  constructor(private crudService: CrudService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.progressBar = $('mat-progress-bar');
    this.cardColumn = $('.card-columns');
    this.cardColumn.hide(0);
    this.activatedRoute.params.subscribe(params => {
      const category: string = params.category;
      this.crudService.GETWithOutAuth(api.getVideosByCategoryURL(), category)
        .subscribe(response => {
          this.videos = response.videos;
          this.stopLoading();
        });
    })
  }

  stopLoading() {
    this.progressBar.slideUp(400);
    this.cardColumn.fadeIn(650);
  }

}
