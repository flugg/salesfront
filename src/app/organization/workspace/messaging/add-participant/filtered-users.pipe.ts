import { Pipe, PipeTransform } from '@angular/core';

import { Conversation } from '../shared/conversation.model';
import { User } from '../../../shared/user.model';

@Pipe({
  name: 'filteredUsers',
  pure: false
})
export class FilteredUsersPipe implements PipeTransform {

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
