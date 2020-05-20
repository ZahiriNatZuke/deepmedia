import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Video} from '../../../../../models/video';
import {environment} from '../../../../../../environments/environment.prod';
import {VideoService} from '../../../../../services/video.service';

@Component({
    selector: 'app-top-carousel',
    templateUrl: './top-carousel.component.html',
    styleUrls: ['./top-carousel.component.scss']
})
export class TopCarouselComponent implements OnInit, AfterViewInit {
    @Input() widthCarousel: number;
    @Input() heightCarousel: number;
    @Input() top: any;
    @Input() VideosTop: Video[];
    URL_STORAGE: string = environment.URL_STORAGE;

    constructor(private videoService: VideoService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        $(`#carousel-${this.top} .carousel-indicators li`)
            .attr('data-target', `#carousel-${this.top}`);
    }

    updateCurrentVideo(video: Video) {
        this.videoService.UpdateCurrentVideoValue(video);
        this.videoService.UpdateCurrentVideoPlayerValue({
            id: video.id,
            poster: this.URL_STORAGE + video.poster.path,
            video: this.URL_STORAGE + video.video.path
        });
    }
}
