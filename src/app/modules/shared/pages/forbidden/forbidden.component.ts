import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit, OnDestroy {

  constructor() {
    $('#app-sidebar').fadeOut(0);
    $('#p-sidebar').css({
      padding: 0,
      marginLeft: 0
    });
  }

  ngOnInit(): void {
    $('#forbidden').fadeIn(300);
  }

  ngOnDestroy(): void {
    $('#app-sidebar').fadeIn(0);
    $('#p-sidebar').css({
      paddingLeft: '5px',
      marginLeft: environment.expandedSidebar ? '250px' : '70px',
      transition: 'all 0s'
    });
  }

}
