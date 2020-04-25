import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

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
