import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'categoryTranslate'
})
export class CategoryTranslatePipe implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case 'Tech':
        return 'Tecnología';
      case 'Tutorial':
        return 'Tutoriales';
      case 'Joke':
        return 'Humor';
      case 'Musical':
        return 'Musical';
      case 'Interesting':
        return 'Interesantes';
      default:
        return value;
    }
  }

}
