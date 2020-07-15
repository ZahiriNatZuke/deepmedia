import {Component, Input, OnInit} from '@angular/core';
import {faAngleDoubleRight, faVideo} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../../environments/environment.prod';
import {Category} from '../../../../models/category';
import {MediaMatcher} from '@angular/cdk/layout';

const URL_ASSETS = environment.URL_ASSETS;

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  faVideo = faVideo;
  faAngleDoubleRight = faAngleDoubleRight;
  @Input() category: Category;
  @Input() idCategory: number;

  constructor(private mediaMatcher: MediaMatcher) {
  }

  ngOnInit(): void {
    $(`#card-${this.idCategory} mat-card`).css({
      background: `url('${URL_ASSETS}img/categories/${this.category.img}') center / cover`
    });
  }

  addAnimation() {
    if (this.mediaMatcher.matchMedia('(max-width: 469.98px)').matches) {
      $(`#card-${this.idCategory} .f-category`).css({
        fontSize: '36px'
      });
      $(`#card-${this.idCategory} .mat-icon-button`).css({
        width: '60px',
        height: '60px',
        fontSize: '40px'
      });
    } else {
      $(`#card-${this.idCategory} .f-category`).css({
        fontSize: '40px'
      });
      $(`#card-${this.idCategory} .mat-icon-button`).css({
        width: '68px',
        height: '68px',
        fontSize: '48px'
      });
    }
  }

  delAnimation() {
    if (this.mediaMatcher.matchMedia('(max-width: 469.98px)').matches) {
      $(`#card-${this.idCategory} .f-category`).css({
        fontSize: '28px'
      });
      $(`#card-${this.idCategory} .mat-icon-button`).css({
        width: '50px',
        height: '50px',
        fontSize: '30px'
      });
    } else {
      $(`#card-${this.idCategory} .f-category`).css({
        fontSize: '32px',
      });
      $(`#card-${this.idCategory} .mat-icon-button`).css({
        width: '55px',
        height: '55px',
        fontSize: '35px'
      });
    }
  }

}
