import { Pipe, PipeTransform } from '@angular/core';

import { Participation } from '../../../core/models/participation.model';
import { Member } from '../../../core/models/member.model';

@Pipe({
  name: 'conversationTitle',
  pure: false
})
export class ConversationTitlePipe implements PipeTransform {
  transform(participations: Participation[], except?: Member): any {
    if (participations) {
      return participations.map(participation => participation.member.user.name).join(', ');
    }
  }
}
