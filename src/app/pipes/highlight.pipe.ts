import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe để highlight (làm nổi bật) text
 * Usage: {{ text | highlight: 'search term' }}
 */
@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchTerm: string): string {
    if (!searchTerm || !value) {
      return value;
    }

    const regex = new RegExp(searchTerm, 'gi');
    return value.replace(regex, (match) => `<mark>${match}</mark>`);
  }
}
