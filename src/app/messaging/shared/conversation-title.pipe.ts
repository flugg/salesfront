import { Pipe, PipeTransform } from '@angular/core';

import { Participation } from '../../core/models/participation.model';
import { User } from '../../core/models/user.model';

@Pipe({
  name: 'conversationTitle',
  pure: false
})
export class ConversationTitlePipe implements PipeTransform {

  /**
   * Transforms a list of participations to a comma-separated conversation title.
   */
  transform(participations: Participation[], except?: User): any {
    if (participations) {
      return participations.map(participation => participation.user.name).join(', ');
    }
  }
}
