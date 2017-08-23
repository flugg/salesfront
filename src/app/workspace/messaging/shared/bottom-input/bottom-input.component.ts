import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vmo-bottom-input',
  templateUrl: 'bottom-input.component.html',
  styleUrls: ['bottom-input.component.scss']
})
export class BottomInputComponent {
  @Input() disabledInput;
  @Input() disabledButton;
  @Output() send = new EventEmitter<any>();

  onSubmit(message) {
    this.send.emit(message);
  }
}
