import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { TeamMember } from '../models/team-member.model';
import { Member } from '../models/member.model';

@Injectable()
export class TeamMemberService {
  constructor(private api: RestApiService) {}

  get(teamId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`teams/${teamId}/members`, cursor, limit, { include: 'member.user,member.activeSession' });
  }

  add(membership: Member, teamId: string): Promise<TeamMember> {
    return this.api.post(`teams/${teamId}/members`, { membership: membership.id }).then(response => response.data);
  }

  update(teamMember: TeamMember, attributes: any): Promise<TeamMember> {
    return this.api.put(`team-members/${teamMember.id}`, attributes).then(response => response.data);
  }

  remove(teamMember: TeamMember): Promise<TeamMember> {
    return this.api.delete(`team-members/${teamMember.id}`).then(response => response.data);
  }
}
