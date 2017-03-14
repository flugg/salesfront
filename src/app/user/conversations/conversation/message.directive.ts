import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[sfMessage]'
})
export class MessageDirective {
  @Input('sfMessage') fromMe: boolean;

  constructor(private el: ElementRef) {
    let color = this.fromMe ? 'blue' : 'gray';
    let align = this.fromMe ? 'right' : 'left';

    this.el.nativeElement.style.backgroundColor = color;
  }

}
