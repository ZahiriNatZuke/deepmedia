import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {environment} from '../../../../environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  step = 0;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  ds = new MyDataSource();
  toggleForm: JQuery<HTMLElement>;

  videoArray: { id: number, video: string }[] = [
    {
      id: 1,
      video: 'video.mp4'
    },
    {
      id: 2,
      video: 'video1.mp4'
    },
    {
      id: 3,
      video: 'video1.mp4'
    }
  ];
  rowHeight: number;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor() {
    this.rowHeight = window.screen.availHeight * 80 / 100;
  }

  ngOnInit(): void {
    this.toggleForm = $('#toggleForm');
    $('app-profile-form').fadeToggle(0);
    $('#all-videos').fadeToggle(0);
    $('#buttonClose').fadeToggle(0);
    window.addEventListener('resize', () => {
      this.getHeight();
    });
  }

  getHeight() {
    this.rowHeight = window.screen.availHeight * 80 / 100;
  }

  showAllVideos() {
    environment.allVideos = true;
    $('mat-accordion').fadeToggle(400);
    setTimeout(() => {
      $('.f-title-card').css({
        font: '400 24px/40px Roboto, "Helvetica Neue", sans-serif',
        transition: 'all .3s'
      });
      $('.d-flex.justify-content-center button').toggleClass('d-none');
    }, 425);
    setTimeout(() => {
      $('#all-videos').fadeToggle(500);
      $('#buttonClose').fadeToggle(500);
    }, 550);
  }
}

export class MyDataSource extends DataSource<string | undefined> {
  private _length = 20;
  private _pageSize = 4;
  private _cachedData = Array.from<string>({length: this._length});
  private _fetchedPages = new Set<number>();
  private _dataStream = new BehaviorSubject<(string | undefined)[]>(this._cachedData);
  private _subscription = new Subscription();

  connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {
    this._subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this._getPageForIndex(range.start);
      const endPage = this._getPageForIndex(range.end - 1);
      for (let i = startPage; i <= endPage; i++) {
        this._fetchPage(i);
      }
    }));
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);
    setTimeout(() => {
      this._cachedData.splice(page * this._pageSize, this._pageSize,
        ...Array.from({length: this._pageSize})
          .map((_, i) => `Item #${page * this._pageSize + i}`));
      this._dataStream.next(this._cachedData);
    }, Math.random() * 1000 + 200);
  }
}
