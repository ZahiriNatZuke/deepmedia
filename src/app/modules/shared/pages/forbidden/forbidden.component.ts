import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit(): void {
    $('#p-sidebar').css('paddingLeft', '0');
    $('#app-sidebar').fadeOut(0);
  }

  ngOnDestroy() {
    $('#app-sidebar').fadeIn(0);
    $('#p-sidebar').css('paddingLeft', '70px');
  }

}
