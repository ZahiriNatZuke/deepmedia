import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category";
import {HelpersService} from "../../../services/helpers.service";

@Component({
  selector: 'app-video-categories',
  templateUrl: './video-categories.component.html',
  styleUrls: ['./video-categories.component.scss']
})
export class VideoCategoriesComponent implements OnInit {
  arrayCategories: Category[];

  constructor(private helpersService: HelpersService) {
  }

  ngOnInit(): void {
    this.helpersService.GETCountVideoByCategories()
      .subscribe(response => {
        let array = new Array(6);
        for (let i = 0; i < array.length; i++) {
          array[i] = response.categories[categories[i]];
        }
        this.arrayCategories = array;
      });
  }
}

enum categories {'Gameplay', 'Joke', 'Musical', 'Interesting', 'Tech', 'Tutorial'}
