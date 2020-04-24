import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor(value % 3600 / 60);
    const seconds = Math.floor(value % 60);
    const strSeconds = seconds >= 10 ? `${seconds}` : `0${seconds}`;
    const strMinutes = minutes >= 10 ? `${minutes}` : `0${minutes}`;
    const strHours = hours >= 10 ? `${hours}` : `0${hours}`;
    return `${strHours}:${strMinutes}:${strSeconds}`;
  }

}
