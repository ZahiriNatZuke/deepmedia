import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit, OnDestroy {

  constructor() {
    //   $('app-sidebar').toggleClass('d-none');
    //   $('#p-sidebar').toggleClass('p-sidebar');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // $('app-sidebar').toggleClass('d-none');
    // $('#p-sidebar').toggleClass('p-sidebar');
  }

}
