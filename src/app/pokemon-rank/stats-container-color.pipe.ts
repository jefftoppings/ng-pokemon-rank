import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statsContainerColor',
  standalone: true,
})
export class StatsContainerColorPipe implements PipeTransform {
  transform(rank: number): { [key: string]: boolean } {
    if (rank === 1) {
      return {
        gold: true,
      };
    } else if (rank === 2) {
      return {
        silver: true,
      };
    } else if (rank === 3) {
      return {
        bronze: true,
      };
    } else if (rank <= 300) {
      return {
        'top-300': true,
      };
    } else {
      return {};
    }
  }
}
