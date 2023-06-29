import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'lightcyan';
    this.el.nativeElement.style.color = 'black';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = 'initial';
    this.el.nativeElement.style.color = 'initial';
  }

}
