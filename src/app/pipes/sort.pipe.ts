import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe để sắp xếp array
 * Usage: {{ array | sort: 'asc' }} hoặc {{ array | sort: 'desc' }}
 */
@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(value: any[], order: 'asc' | 'desc' = 'asc', property?: string): any[] {
    if (!value || !Array.isArray(value)) {
      return value;
    }

    const sorted = [...value].sort((a, b) => {
      let aValue = property ? a[property] : a;
      let bValue = property ? b[property] : b;

      // Convert to string for comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
      }
      if (typeof bValue === 'string') {
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }
}
