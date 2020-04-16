import {Component, Input, OnInit} from '@angular/core';
import {faVideo, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  faVideo = faVideo;
  faAngleDoubleRight = faAngleDoubleRight;

  @Input() category: { name: string, videos: number, img: string };
  @Input() idCategory: number;

  constructor() {
  }

  ngOnInit(): void {
    $(`#card-${this.idCategory} mat-card`).css({
      background: `url('${this.getPath(this.category.img)}') center`,
      'background-size': 'cover'
    });
  }

  getPath(img: string): string {
    return `../../../../assets/img/categories/${img}`;
  }

  addAnimation() {
    $(`#card-${this.idCategory} .f-category`).css({
      fontSize: '40px',
      transition: 'all .5s'
    });
    $(`#card-${this.idCategory} .mat-icon-button`).css({
      width: '68px',
      height: '68px',
      fontSize: '48px',
      transition: 'all .5s'
    });
  }

  delAnimation() {
    $(`#card-${this.idCategory} .f-category`).css({
      fontSize: '32px',
      transition: 'all .5s'
    });
    $(`#card-${this.idCategory} .mat-icon-button`).css({
      width: '55px',
      height: '55px',
      fontSize: '35px',
      transition: 'all .5s'
    });
  }

}
