import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Video} from './video';

export class VideoDataSource extends DataSource<Video> {
  private _length;
  private _pageSize = 6;
  private readonly _cachedData: Video[];
  private _fetchedPages = new Set<number>();
  private readonly _dataStream: BehaviorSubject<Video[]>;
  private _subscription = new Subscription();

  constructor(initialCachedData: Video[]) {
    super();
    this._cachedData = initialCachedData;
    this._length = initialCachedData.length;
    this._dataStream = new BehaviorSubject<Video[]>(this._cachedData);
  }

  connect(collectionViewer: CollectionViewer): Observable<Video[]> {
    this._subscription.add(collectionViewer.viewChange.subscribe(range => {
        const startPage = this._getPageForIndex(range.start);
        if (this._fetchedPages.has(startPage))
          return;
        else
          this._fetchedPages.add(startPage);
        // Aqui es donde va la peticion GET al servidor con un paginacion
        // de 6, la respuesta del server la agrego al _cachedData
        this._dataStream.next(this._cachedData);
      })
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }
}
