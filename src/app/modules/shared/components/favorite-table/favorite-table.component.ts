import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {faComment, faEye, faFileDownload, faFilter, faStar, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {Video} from '../../../../models/video';
import {CrudService} from '../../../../services/crud.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-favorite-table',
  templateUrl: './favorite-table.component.html',
  styleUrls: ['./favorite-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class FavoriteTableComponent implements OnInit {
  Videos: Video[];
  @Output() loadEnd: EventEmitter<boolean> = new EventEmitter<boolean>();
  dataSource: MatTableDataSource<Video>;
  filterForm: JQuery<HTMLElement>;
  columnsToDisplay = ['category', 'title', 'username', 'created_at'];
  expandedElement: Video | null;
  faStar = faStar;
  faThumbsUp = faThumbsUp;
  faEye = faEye;
  faComment = faComment;
  faFilter = faFilter;
  faFileDownload = faFileDownload;
  show: boolean;

  constructor(private crudService: CrudService, private notificationService: NotificationService) {
    this.crudService.GETForMyFavorites()
        .subscribe(response => {
          this.Videos = response.videos;
          if (this.Videos.length === 0)
            this.notificationService.showNotification('Info Video', 'Usted aún no tiene videos favoritos', 'success');
          this.dataSource = new MatTableDataSource<Video>(this.Videos);
          this.loadEnd.emit(true);
        });
    this.show = false;
  }

  ngOnInit() {
    this.filterForm = $('#filterForm');
    this.filterForm.toggle(0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleFilterForm() {
    this.filterForm.toggle(750);
    this.dataSource.filter = '';
  }
}
