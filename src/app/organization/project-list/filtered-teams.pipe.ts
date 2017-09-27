import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../../core/models/team.model';

@Pipe({
  name: 'filteredTeams',
  pure: false
})
export class FilteredTeamsPipe implements PipeTransform {
  transform(teams: Team[]): any {
    if (teams) {
      return teams.slice(0, 3);
    }
  }
}
