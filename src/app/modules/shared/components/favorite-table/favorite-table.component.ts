import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {faGamepad, faThumbsUp, faEye, faComment, faStar, faFilter} from '@fortawesome/free-solid-svg-icons';
import {Video} from "../../../../models/video";
import {CrudService} from "../../../../services/crud.service";

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
  faGamepad = faGamepad;
  faThumbsUp = faThumbsUp;
  faEye = faEye;
  faComment = faComment;
  faFilter = faFilter;
  show: boolean;

  constructor(private crudService: CrudService) {
    this.crudService.GETForMyFavorites()
      .subscribe(response => {
        this.Videos = response.videos;
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
  }
}
