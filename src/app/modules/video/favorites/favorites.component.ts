import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  progressBar: JQuery<HTMLElement>;
  favoriteTable: JQuery<HTMLElement>;

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('#DeepMedia | Mis Favoritos');
    this.progressBar = $('.progress-bar-znz mat-progress-bar');
    this.favoriteTable = $('app-favorite-table');
    this.favoriteTable.hide(0);
  }

  stopLoading() {
    this.progressBar.toggle(400);
    this.favoriteTable.fadeIn(650);
  }
}
