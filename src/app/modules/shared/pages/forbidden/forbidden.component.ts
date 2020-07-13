import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';
import {Router} from '@angular/router';
import {Banished} from '../../../../models/banished';
import * as moment from 'moment';
import {CrudService} from '../../../../services/crud.service';
import {NotificationService} from '../../../../services/notification.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private crudService: CrudService,
              private notificationService: NotificationService,
              private titleService: Title) {
    $('#app-sidebar').fadeOut(0);
    $('#p-sidebar').css({
      padding: 0,
      marginLeft: 0
    });
    sessionStorage.setItem('location', 'Forbidden');
  }

  ngOnInit(): void {
    this.titleService.setTitle('#DeepMedia | 403');
    $('#forbidden').fadeIn(300);
    $('#chat').fadeOut(0);
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('location');
    $('#app-sidebar').fadeIn(0);
    $('#p-sidebar').css({
      paddingLeft: '5px',
      marginLeft: environment.expandedSidebar ? '250px' : '70px',
      transition: 'all 0s'
    });
    $('#chat').fadeIn(400);
  }

  gotToHome() {
    if (localStorage.getItem('X-Banished')) {
      const banished: Banished = JSON.parse(localStorage.getItem('X-Banished'));
      if (moment(banished.banish_expired_at * 1000).isBefore()) {
        localStorage.removeItem('X-Banished');
        this.crudService.RequestToEraseBan(banished.user, banished.hash)
            .subscribe(() => {
              return this.router.navigate(['/video/categories']).then();
            });
      } else {
        this.notificationService.showErrors('Info Seguridad', [
          `Usuario aún Baneado.`,
          `Causa: ${banished.why}`,
          `Por: ${banished.byWho}.`,
          `Fin: ${moment(banished.banish_expired_at * 1000).fromNow()}.`
        ], 'danger');
      }
    } else this.router.navigate(['video/categories']).then();
  }

}
