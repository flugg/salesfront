import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Member } from '../models/member.model';
import { PaginationResponse } from '../pagination-response';

import { RestApiService } from '../rest-api.service';

@Injectable()
export class MemberService {
  constructor(private api: RestApiService) {}

  get(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/members`, cursor, limit, { include: 'teamMembers' });
  }

  list(organizationId: string): Observable<Member[]> {
    return this.api.get(`organizations/${organizationId}/members`).map(response => response.data);
  }

  find(id: string): Observable<Member> {
    return this.api.get(`members/${id}`, { include: 'teamMembers.team.project' }).map(response => response.data);
  }

  create(inviteId: string, userId: string) {
    return this.api.post(`users/${userId}/memberships`, {
      invite: inviteId,
      include: 'teamMembers.team.project'
    }).then(response => response.data);
  }

  delete(memberId: string, deleteSales: boolean) {
    return this.api.delete(`members/${memberId}`, { include: 'teamMembers.team.project', deleteSales }).then(response => response.data);
  }

  recover(memberId: string) {
    return this.api.put(`members/${memberId}`, { include: 'teamMembers.team.project' }).then(response => response.data);
  }
}
