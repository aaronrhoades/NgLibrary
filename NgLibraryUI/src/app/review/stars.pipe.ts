import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
  standalone: true
})
export class StarsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let stars = '';
    
    for(let i = 0; i < value; i++) {
      stars = stars + '⭐';
    }
    return stars;
  }

}
