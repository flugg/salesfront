import { Pipe, PipeTransform } from '@angular/core';

import { Conversation } from '../../../core/models/conversation.model';
import { Member } from '../../../core/models/member.model';

@Pipe({
  name: 'filteredMembers',
  pure: false
})
export class FilteredMembersPipe implements PipeTransform {
  transform(members: Member[], conversation: Conversation): any {
    if (members && conversation) {
      const participants = conversation.participations.filter(participation => {
        return !participation.leftAt;
      }).map(participation => participation.memberId);

      return members.filter(member => participants.indexOf(member.id) === -1);
    }
  }
}
