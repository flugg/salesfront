import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vmo-bottom-input',
  templateUrl: './bottom-input.component.html',
  styleUrls: ['./bottom-input.component.scss']
})
export class BottomInputComponent {

  /**
   * Indicates if the input is disabled.
   */
  @Input() disabledInput;

  /**
   * Indicates if the button is disabled.
   */
  @Input() disabledButton;

  /**
   * The send event emitted on click.
   */
  @Output() send = new EventEmitter<any>();

  /**
   * Handles submit events on the form.
   */
  onSubmit(message) {
    this.send.emit(message);
  }
}
