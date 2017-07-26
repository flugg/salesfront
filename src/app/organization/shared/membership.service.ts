import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/http/rest-api.service';
import { PaginationResponse } from '../../core/http/pagination-response';
import { Membership } from './membership.model';

@Injectable()
export class MembershipService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of all memberships in a project.
   */
  getAllForProject(projectId: string): Observable<Membership[]> {
    return this.api.get(`projects/${projectId}/memberships`, { include: 'teamMembers.team,activeSession,user' }).map(response => response.data);
  }

  /**
   * Fetches a list of memberships in a project.
   */
  getForProject(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/memberships`, cursor, limit);
  }

  /**
   * Fetches a list of memberships in a team.
   */
  getForTeam(teamId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`teams/${teamId}/memberships`, cursor, limit);
  }

  /**
   * Fetches a list of memberships in a projet.
   */
  getForOrganization(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/memberships`, cursor, limit, {include: 'teamMembers.team,activeSession'});
  }

  /**
   * Fetches a single membership by id.
   */
  find(id: string): Observable<Membership> {
    return this.api.get(`memberships/${id}`, {include: ['user', 'teamMembers']}).map(response => response.data);
  }

  /**
   * Creates a new membership.
   */
  create(inviteId: string, projectId: string, userId: string) {
    return this.api.post(`projects/${projectId}/memberships`, {
      invite: inviteId,
      user: userId
    }).then(response => response.data);
  }
}
