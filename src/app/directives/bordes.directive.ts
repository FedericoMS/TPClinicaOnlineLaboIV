import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[bordeado]'
})
export class BordesDirective implements AfterViewInit {

  @Input() color : string = 'yellow';

  constructor(private elementRef : ElementRef) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.border = `2px solid ${this.color}`;
  }

}
