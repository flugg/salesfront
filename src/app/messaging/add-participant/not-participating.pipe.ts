import { Pipe, PipeTransform } from '@angular/core';

import { Participation } from '../../core/models/participation.model';

@Pipe({
  name: 'notParticipating',
  pure: false,
})
export class NotParticipatingPipe implements PipeTransform {

  /**
   * Transforms the data to only include participants currently participating.
   */
  transform(participations?: Participation[]): any {
    if (participations == null) {
      return null;
    }

    return participations.filter(participation => !participation.leftAt);
  }
}
