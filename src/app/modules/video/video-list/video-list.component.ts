import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../services/crud.service';
import {API} from '../../../services/API';
import {ActivatedRoute} from '@angular/router';
import {Video} from '../../../models/video';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

const api = new API();

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  videos: Video[];
  progressBar: JQuery<HTMLElement>;
  cardColumn: JQuery<HTMLElement>;
  next_page_url: string;
  faAngleDown = faAngleDown;
  loading: boolean;

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute) {
    this.loading = false;
    this.activatedRoute.params.subscribe(params => {
      const category: string = params.category;
      this.crudService.GETWithOutAuth(api.getVideosByCategoryURL(), category)
        .subscribe(response => {
          this.next_page_url = response.videos.next_page_url;
          this.videos = response.videos.data;
          this.stopLoading();
        });
    });
  }

  ngOnInit(): void {
    this.progressBar = $('.progress-bar-znz mat-progress-bar');
    this.cardColumn = $('.card-columns');
    this.cardColumn.hide(0);
  }

  stopLoading() {
    this.progressBar.slideUp(400);
    this.cardColumn.fadeIn(650);
  }

  fetchMoreVideos() {
    this.loading = true;
    this.crudService.GETWithOutAuth(this.next_page_url).subscribe(response => {
      setTimeout(() => {
        const newVideos: Video[] = response.videos.data;
        this.videos.push(...newVideos);
        this.next_page_url = response.videos.next_page_url;
        this.loading = false;
      }, 500);
    });
  }

}
