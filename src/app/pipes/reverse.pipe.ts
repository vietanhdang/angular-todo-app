import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe để đảo ngược chuỗi hoặc mảng
 * Usage: {{ text | reverse }} hoặc {{ array | reverse }}
 */
@Pipe({
  name: 'reverse',
  standalone: true,
})
export class ReversePipe implements PipeTransform {
  transform(value: any): any {
    if (!value) {
      return value;
    }

    if (typeof value === 'string') {
      return value.split('').reverse().join('');
    }

    if (Array.isArray(value)) {
      return [...value].reverse();
    }

    return value;
  }
}
