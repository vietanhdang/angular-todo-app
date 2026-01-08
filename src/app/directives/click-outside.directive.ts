import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Custom Directive: appClickOutside
 * Emit event khi click bên ngoài element
 *
 * Usage:
 * <div appClickOutside (clickOutside)="onClickOutside()">
 *   Click outside me
 * </div>
 */
@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    const clickedInside = this.el.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
