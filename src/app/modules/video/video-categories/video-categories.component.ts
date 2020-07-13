import {Component, OnInit} from '@angular/core';
import {Category} from '../../../models/category';
import {HelpersService} from '../../../services/helpers.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-video-categories',
  templateUrl: './video-categories.component.html',
  styleUrls: ['./video-categories.component.scss']
})
export class VideoCategoriesComponent implements OnInit {
  arrayCategories: Category[];
  progressBar: JQuery<HTMLElement>;
  cardColumn: JQuery<HTMLElement>;

  constructor(private helpersService: HelpersService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('#DeepMedia | Categorías');
    this.progressBar = $('.progress-bar-znz mat-progress-bar');
    this.cardColumn = $('.card-columns');
    this.cardColumn.hide(0);
    setTimeout(_ => {
      this.helpersService.GETCountVideoByCategories()
          .subscribe(response => {
            const array = new Array(6);
            for (let i = 0; i < array.length; i++) {
              array[i] = response.categories[categories[i]];
            }
            this.arrayCategories = array;
            this.stopLoading();
          });
    }, 350);
  }

  stopLoading() {
    this.progressBar.toggle(400);
    this.cardColumn.fadeIn(650);
  }

}

enum categories {'Gameplay', 'Joke', 'Musical', 'Interesting', 'Tech', 'Tutorial'}
