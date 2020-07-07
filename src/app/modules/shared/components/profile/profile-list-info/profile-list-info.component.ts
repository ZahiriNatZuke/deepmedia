import {Component, Input, OnInit} from '@angular/core';
import {DetailAdvancedStats} from '../../../../../models/detail-advanced-stats';

@Component({
  selector: 'app-profile-list-info',
  templateUrl: './profile-list-info.component.html',
  styleUrls: ['./profile-list-info.component.scss']
})
export class ProfileListInfoComponent implements OnInit {
  @Input() icon;
  @Input() statsName;
  @Input() statsDetail: DetailAdvancedStats;
  up: boolean;

  constructor() {
    this.up = true;
  }

  ngOnInit(): void {
  }

  percent(total: number): number {
    return this.statsDetail.avg * 100 / total;
  }

}
