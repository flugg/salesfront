import { Component, Input } from '@angular/core';
import { Message } from '../../shared/message.model';

@Component({
  selector: 'vmo-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {

  /**
   * The message model.
   */
  @Input() message: Message;

  /**
   * Indicator if the message is owned by user.
   */
  @Input() own: boolean;
}
