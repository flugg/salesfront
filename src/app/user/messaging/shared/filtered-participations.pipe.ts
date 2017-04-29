import { Pipe, PipeTransform } from '@angular/core';

import { Participation } from './participation.model';
import { User } from '../../../core/user.model';

@Pipe({
  name: 'filteredParticipations',
  pure: false
})
export class FilteredParticipationsPipe implements PipeTransform {

  /**
   * Filter the data to only include participants currently participating.
   */
  transform(participations: Participation[], except?: User): any {
    if (participations) {
      participations = participations.filter(participation => !participation.leftAt);

      return !except ? participations : participations.filter(participation => participation.userId !== except.id);
    }
  }
}
