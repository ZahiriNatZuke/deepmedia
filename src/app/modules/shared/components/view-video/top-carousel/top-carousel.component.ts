import {Component, Input, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-top-carousel',
  templateUrl: './top-carousel.component.html',
  styleUrls: ['./top-carousel.component.scss']
})
export class TopCarouselComponent implements OnInit, AfterViewInit {
  @Input() widthCarousel: number;
  @Input() heightCarousel: number;
  @Input() top: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $(`#carousel-${this.top} .carousel-indicators li`).attr('data-target', `#carousel-${this.top}`);
  }

}
