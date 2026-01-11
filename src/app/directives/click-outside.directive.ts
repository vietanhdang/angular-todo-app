import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

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
export class ClickOutsideDirective implements OnInit {
  @Output() clickOutside = new EventEmitter<void>();
  private isInitialized = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Đợi một chút để bỏ qua click event đang bubble từ element trigger directive
    setTimeout(() => {
      this.isInitialized = true;
    }, 0);
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    // Bỏ qua click đầu tiên ngay sau khi directive được khởi tạo
    if (!this.isInitialized) {
      return;
    }

    const clickedInside = this.el.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
