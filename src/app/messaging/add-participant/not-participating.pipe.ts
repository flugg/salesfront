import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../../core/models/user.model';
import { Conversation } from '../../core/models/conversation.model';

@Pipe({
  name: 'notParticipating',
  pure: false,
})
export class NotParticipatingPipe implements PipeTransform {

  /**
   * Transforms the data to only include users not currently participating.
   */
  transform(users: User[], conversation: Conversation): any {
    if (users && conversation) {
      const participants = conversation.participations.filter(participation => {
        return !participation.leftAt;
      }).map(participation => participation.userId);

      return users.filter(user => !participants.includes(user.id));
    }
  }
}
