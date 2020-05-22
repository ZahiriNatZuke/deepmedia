import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statsFilter'
})
export class StatsFilterPipe implements PipeTransform {

  transform(value: number): unknown {
    if (value > 1000)
      return value / 1000;
    else
      return value;
  }

}
