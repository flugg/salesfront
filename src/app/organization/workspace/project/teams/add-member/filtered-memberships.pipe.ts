import { Pipe, PipeTransform } from '@angular/core';

import { Team } from '../../shared/team.model';
import { Membership } from '../../../../shared/membership.model';

@Pipe({
  name: 'filteredMemberships',
  pure: false
})
export class FilteredMembershipsPipe implements PipeTransform {

  /**
   * Transforms the data to only include memberships not currently in the team.
   */
  transform(memberships: Membership[], team: Team): any {
    if (memberships) {
      return memberships.filter(membership => {
        for (const teamMember of membership.teamMembers) {
          if (teamMember.teamId === team.id && !teamMember.leftAt) {
            return false;
          }
        }
        return true;
      });
    }
  }
}
