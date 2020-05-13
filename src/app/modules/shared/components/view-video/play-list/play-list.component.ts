import {Component, OnInit, AfterViewInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {faPlayCircle, faThumbsUp, faComment, faEye, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit, AfterViewInit {

  faPlayCircle = faPlayCircle;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faStar = faStar;

  playList: JQuery<HTMLElement>;
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VII - The Force Awakens',
    'Episode VII - The Force Awakens',
    'Episode VII - The Force Awakens',
    'Episode VII - The Force Awakens',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  constructor() {
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => this.ngAfterViewInit());
  }

  ngAfterViewInit(): void {
    this.playList = $('#playList');
  }

  getMaxHeight() {
    return Math.floor(window.screen.availHeight * 64 / 100);
  }

}
