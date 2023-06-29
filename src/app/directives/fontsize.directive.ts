import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[hoverFontSize]'
})
export class FontsizeDirective {

  @Input('hoverFontSize') fontSize = '16px';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.fontSize = '20px';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.fontSize = this.fontSize;
  }

}
