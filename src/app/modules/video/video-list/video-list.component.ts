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

  constructor(private crudService: CrudService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const category: string = params.category;
      this.crudService.GETWithOutAuth(api.getVideosByCategoryURL(), category)
        .subscribe((response: any) => {
          this.videos = response.videos;
        });
    })
  }

}
