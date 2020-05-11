import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category";

@Component({
  selector: 'app-video-categories',
  templateUrl: './video-categories.component.html',
  styleUrls: ['./video-categories.component.scss']
})
export class VideoCategoriesComponent implements OnInit {
  categories: Category[] = [
    {
      name: 'gameplay',
      link: 'gameplay',
      img: 'gameplay.png',
      count_videos: 100
    },
    {
      name: 'humor',
      link: 'joke',
      img: 'joke.jpg',
      count_videos: 100
    },
    {
      name: 'musical',
      link: 'musical',
      img: 'musical.jpg',
      count_videos: 100
    },
    {
      name: 'tecnología',
      link: 'tech',
      img: 'tech.jpg',
      count_videos: 100
    },
    {
      name: 'interesantes',
      link: 'interesting',
      img: 'interesting.jpg',
      count_videos: 100
    },
    {
      name: 'tutoriales',
      link: 'tutorial',
      img: 'tutorial.png',
      count_videos: 100
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
