import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/http/rest-api.service';
import { PaginationResponse } from '../../core/http/pagination-response';
import { Membership } from './membership.model';
import { TeamMember } from './team-member.model';
import { Team } from '../workspace/project/shared/team.model';

@Injectable()
export class TeamMemberService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of members in a team.
   */
  get(teamId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`teams/${teamId}/members`, cursor, limit, {include: 'membership.user,membership.activeSession'});
  }

  /**
   * Adds a member to a team.
   */
  add(membership: Membership, team: Team): Promise<TeamMember> {
    return this.api.post(`teams/${team.id}/members`, {
      membership: membership.id
    });
  }

  /**
   * Removes a member from a team.
   */
  remove(teamMember: TeamMember): Promise<TeamMember> {
    return this.api.delete(`team-members/${teamMember.id}`);
  }
}
