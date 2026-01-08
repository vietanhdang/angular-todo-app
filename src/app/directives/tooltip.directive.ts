import { Directive, ElementRef, HostListener, Input, Renderer2, OnDestroy } from '@angular/core';

/**
 * Custom Directive: appTooltip
 * Hiển thị tooltip khi hover
 *
 * Usage:
 * <button appTooltip tooltipText="Click me!">Button</button>
 */
@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltipText: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipElement: HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) return;
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    // Create tooltip element
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));

    // Style tooltip
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background-color', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '8px 12px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '6px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '14px');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0 2px 8px rgba(0,0,0,0.2)');
    this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');

    // Position tooltip
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.getTooltipPosition(hostPos);

    this.renderer.setStyle(this.tooltipElement, 'top', `${tooltipPos.top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${tooltipPos.left}px`);

    // Add to body
    this.renderer.appendChild(document.body, this.tooltipElement);

    // Animate in
    setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
        this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.3s');
      }
    }, 0);
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private getTooltipPosition(hostPos: DOMRect): { top: number; left: number } {
    const gap = 10;
    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostPos.top + window.scrollY - 40;
        left = hostPos.left + window.scrollX + hostPos.width / 2 - 50;
        break;
      case 'bottom':
        top = hostPos.bottom + window.scrollY + gap;
        left = hostPos.left + window.scrollX + hostPos.width / 2 - 50;
        break;
      case 'left':
        top = hostPos.top + window.scrollY + hostPos.height / 2 - 20;
        left = hostPos.left + window.scrollX - 110;
        break;
      case 'right':
        top = hostPos.top + window.scrollY + hostPos.height / 2 - 20;
        left = hostPos.right + window.scrollX + gap;
        break;
    }

    return { top, left };
  }

  ngOnDestroy() {
    this.hideTooltip();
  }
}
