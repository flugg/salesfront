import { Pipe, PipeTransform } from '@angular/core';

import { Member } from '../../../../core/models/member.model';
import { Team } from '../../../../core/models/team.model';

@Pipe({
  name: 'filteredMemberships',
  pure: false
})
export class FilteredMembershipsPipe implements PipeTransform {
  transform(memberships: Member[], team: Team): any {
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
