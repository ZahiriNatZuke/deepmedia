import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-video-categories',
  templateUrl: './video-categories.component.html',
  styleUrls: ['./video-categories.component.scss']
})
export class VideoCategoriesComponent implements OnInit {
  categories = [
    {
      name: 'gameplay',
      img: 'gameplay.png',
      videos: 100
    },
    {
      name: 'humor',
      img: 'joke.jpg',
      videos: 100
    },
    {
      name: 'musical',
      img: 'musical.jpg',
      videos: 100
    },
    {
      name: 'tecnología',
      img: 'tech.jpg',
      videos: 100
    },
    {
      name: 'interesantes',
      img: 'interesting.jpg',
      videos: 100
    },
    {
      name: 'tutoriales',
      img: 'tutorial.png',
      videos: 100
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
    $('mat-card').css({
      background: `url('${this.getPath(this.categories[2].img)}') center`,
      'background-size': 'cover'
    });
  }

  getPath(img: string): string {
    return `../../assets/img/categories/${img}`;
  }
}
