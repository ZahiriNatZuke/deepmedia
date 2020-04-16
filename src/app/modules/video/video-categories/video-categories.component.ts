import {Component, OnInit} from '@angular/core';
import {faVideo, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';

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
      name: 'tutorial',
      img: 'tutorial.png',
      videos: 100
    },
  ];
  faVideo = faVideo;
  faAngleDoubleRight = faAngleDoubleRight;

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

  addAnimation() {
    $('.f-category').css({
      fontSize: '40px',
      transition: 'all .5s'
    });
    $('.mat-icon-button').css({
      width: '68px',
      height: '68px',
      fontSize: '48px',
      transition: 'all .5s'
    });
    $('.f-video').fadeIn(500);
  }

  delAnimation() {
    $('.f-category').css({
      fontSize: '32px',
      transition: 'all .5s'
    });
    $('.mat-icon-button').css({
      width: '55px',
      height: '55px',
      fontSize: '35px',
      transition: 'all .5s'
    });
    $('.f-video').fadeOut(100);
  }
}
