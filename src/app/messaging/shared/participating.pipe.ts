import { Pipe, PipeTransform } from '@angular/core';

import { Participation } from '../../core/models/participation.model';
import { User } from '../../core/models/user.model';

@Pipe({
  name: 'participating',
  pure: false,
})
export class ParticipatingPipe implements PipeTransform {

  /**
   * Transforms the data to only include participants currently participating.
   */
  transform(participations: Participation[], except?: User): any {
    if (participations) {
      participations = participations.filter(participation => !participation.leftAt);

      return !except ? participations : participations.filter(participation => participation.userId !== except.id);
    }
  }
}
