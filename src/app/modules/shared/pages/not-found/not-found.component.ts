import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor() {
    // $('app-sidebar').addClass('d-none');
    // $('#p-sidebar').removeClass('p-sidebar');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // $('app-sidebar').removeClass('d-none');
    // $('#p-sidebar').addClass('p-sidebar');
  }

}
