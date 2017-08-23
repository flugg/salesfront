import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { Membership } from '../models/membership.model';

@Injectable()
export class MembershipService {
  constructor(private api: RestApiService) {}

  getAllForProject(projectId: string): Observable<Membership[]> {
    return this.api.get(`projects/${projectId}/memberships`, { include: 'teamMembers.team,activeSession,user' }).map(response => response.data);
  }

  getForProject(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/memberships`, cursor, limit, {include: 'teamMembers'});
  }

  getForTeam(teamId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`teams/${teamId}/memberships`, cursor, limit);
  }

  getForOrganization(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/memberships`, cursor, limit, {include: 'teamMembers.team,activeSession'});
  }

  find(id: string): Observable<Membership> {
    return this.api.get(`memberships/${id}`, {include: ['user', 'teamMembers']}).map(response => response.data);
  }

  create(inviteId: string, userId: string) {
    return this.api.post(`users/${userId}/memberships`, {
      invite: inviteId
    }).then(response => response.data);
  }
}
