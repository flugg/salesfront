import { Pipe, PipeTransform } from '@angular/core';

import { Participation } from '../../../core/models/participation.model';
import { Member } from '../../../core/models/member.model';

@Pipe({
  name: 'filteredParticipations',
  pure: false
})
export class FilteredParticipationsPipe implements PipeTransform {
  transform(participations: Participation[], except?: Member): any {
    if (participations) {
      participations = participations.filter(participation => !participation.leftAt);

      return !except ? participations : participations.filter(participation => participation.memberId !== except.id);
    }
  }
}
