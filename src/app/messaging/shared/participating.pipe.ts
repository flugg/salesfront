import { Pipe, PipeTransform } from '@angular/core';

import { Participation } from '../../core/models/participation.model';

@Pipe({
  name: 'participating',
  pure: false,
})
export class ParticipatingPipe implements PipeTransform {

  /**
   * Transforms the data to only include participants currently participating.
   */
  transform(participations?: Participation[], args?: any): any {
    if (participations == null) {
      return null;
    }

    return participations.filter(participation => ! participation.leftAt);
  }
}
