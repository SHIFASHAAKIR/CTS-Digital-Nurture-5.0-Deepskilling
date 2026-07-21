import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// HANDS-ON 3 - Task 3, Steps 33 & 37:
// Adds a background highlight on mouseenter, removes it on mouseleave.
@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef<HTMLElement>) {}
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight || 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
