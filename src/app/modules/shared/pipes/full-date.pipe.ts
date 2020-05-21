import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es-us';

@Pipe({
  name: 'fullDate'
})
export class FullDatePipe implements PipeTransform {

  transform(value: any): string {
    return moment(value).format('LLLL');
  }

}
