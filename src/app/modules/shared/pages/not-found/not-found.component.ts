import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor() {
    $('#app-sidebar').fadeOut(0);
    $('#p-sidebar').css({
      padding: 0,
      marginLeft: 0
    });
    sessionStorage.setItem('location', 'NotFound');
  }

  ngOnInit(): void {
    $('#notfound').fadeIn(300);
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

}
