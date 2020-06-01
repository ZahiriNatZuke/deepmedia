import {Pipe, PipeTransform} from '@angular/core';
import * as fileSize from 'filesize';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: number): string {
    return fileSize(value, {output: 'string', round: 2});
  }

}
