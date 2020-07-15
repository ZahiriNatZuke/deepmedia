import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {faFilter, faStar} from '@fortawesome/free-solid-svg-icons';
import {Video} from '../../../../models/video';
import {CrudService} from '../../../../services/crud.service';
import {NotificationService} from '../../../../services/notification.service';
import {ThemeConfigService} from '../../../../services/theme-config.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

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
export class FavoriteTableComponent implements OnInit, AfterViewInit {
  Videos: Video[];
  @Output() loadEnd: EventEmitter<boolean> = new EventEmitter<boolean>();
  dataSource: MatTableDataSource<Video>;
  filterForm: JQuery<HTMLElement>;
  columnsToDisplay = ['category', 'title', 'username', 'created_at'];
  expandedElement: Video | null;
  faStar = faStar;
  faFilter = faFilter;
  show: boolean;
  currentTheme: { theme: string } = this.themeConfigService.config;
  mediaQueryStatus: { message?: string; status: boolean };

  constructor(private crudService: CrudService,
              private notificationService: NotificationService,
              private themeConfigService: ThemeConfigService,
              private breakpointObserver: BreakpointObserver) {
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
    this.breakpointObserver.observe('(max-width: 767.98px)')
        .subscribe((stateDevice: BreakpointState) => {
          if (stateDevice.matches) {
            this.mediaQueryStatus = {
              status: false,
              message: 'En este dispositivo móvil no es posible visualizar esta opción.'
            };
          }
        });
    this.breakpointObserver
        .observe('(max-width: 767.98px) and (min-height: 768px) and (orientation: portrait)')
        .subscribe((stateDevice: BreakpointState) => {
          if (stateDevice.matches) {
            this.mediaQueryStatus = {
              status: false,
              message: 'Para hacer uso de esta opción, por favor gire su dispositivo móvil.'
            };
          }
        });
    this.breakpointObserver.observe('(min-width: 768px)')
        .subscribe((stateDevice: BreakpointState) => {
          if (stateDevice.matches) {
            this.mediaQueryStatus = {
              status: true
            };
            $('app-profile-poster-video .btn-play').css({
              left: '39%',
              bottom: '35%'
            });
          }
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleFilterForm() {
    this.filterForm.toggle(750);
    this.dataSource.filter = '';
  }

  ngAfterViewInit(): void {
    this.filterForm = $('#filterForm');
    this.filterForm.toggle(0);
  }
}
