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
  add(membership: Membership, teamId: string): Promise<TeamMember> {
    return this.api.post(`teams/${teamId}/members`, {
      membership: membership.id
    });
  }

  /**
   * Updates a member in a team.
   */
  update(teamMember: TeamMember, attributes: any): Promise<TeamMember> {
    return this.api.put(`team-members/${teamMember.id}`, attributes).then(response => response.data);
  }

  /**
   * Removes a member from a team.
   */
  remove(teamMember: TeamMember): Promise<TeamMember> {
    return this.api.delete(`team-members/${teamMember.id}`).then(response => response.data);
  }
}
