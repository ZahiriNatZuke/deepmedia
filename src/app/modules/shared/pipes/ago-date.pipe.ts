import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es-us';

@Pipe({
  name: 'agoDate'
})
export class AgoDatePipe implements PipeTransform {

  transform(value: any): string {
    return moment(value).fromNow();
  }

}
