import { Component, Input } from '@angular/core';
import { Message } from '../../../../core/models/message.model';

@Component({
  selector: 'vmo-message-box',
  templateUrl: 'message-box.component.html',
  styleUrls: ['message-box.component.scss']
})
export class MessageBoxComponent {
  @Input() message: Message;
  @Input() own: boolean;
}
