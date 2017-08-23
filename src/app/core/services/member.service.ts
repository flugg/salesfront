import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { Member } from '../models/member.model';

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
    return this.api.get(`members/${id}`, { include: 'teamMembers' }).map(response => response.data);
  }

  create(inviteId: string, userId: string) {
    return this.api.post(`users/${userId}/memberships`, {
      invite: inviteId
    }).then(response => response.data);
  }
}
