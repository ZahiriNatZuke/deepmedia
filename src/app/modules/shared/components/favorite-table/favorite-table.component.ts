import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {faGamepad, faThumbsUp, faEye, faComment, faStar, faFilter} from '@fortawesome/free-solid-svg-icons';

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

  faStar = faStar;
  faGamepad = faGamepad;
  faThumbsUp = faThumbsUp;
  faEye = faEye;
  faComment = faComment;
  faFilter = faFilter;

  columnsToDisplay = ['categoria', 'titulo', 'propietario', 'fecha'];
  expandedElement: PeriodicElement | null;

  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  show: boolean;
  filterForm: JQuery<HTMLElement>;

  constructor() {
    this.show = false;
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  }

  ngOnInit() {
    this.filterForm = $('#filterForm');
    this.filterForm.toggle(0);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleFilterForm() {
    this.filterForm.toggle(750);
  }
}

export interface PeriodicElement {
  categoria: string;
  propietario: string;
  fecha: string;
  titulo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  },
  {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  },
  {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  }, {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  }, {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  },
  {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  },
  {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  },
  {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  },
  {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  },
  {
    propietario: 'ZahiriNatZuke',
    categoria: 'Hydrogen',
    fecha: 'hace un momento',
    titulo: 'Hydrogen is a chemical element',
  }
];
