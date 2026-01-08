import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * Custom Directive: appHighlight
 * Thêm highlight effect khi hover
 *
 * Usage:
 * <p appHighlight [highlightColor]="'yellow'">Hover me!</p>
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() highlightColor: string = '#FFEB3B';

  private originalBackground: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.originalBackground = this.el.nativeElement.style.backgroundColor || '';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.originalBackground);
  }

  private highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s');
  }
}
