import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Member } from '../models/member.model';
import { Project } from '../models/project.model';
import { PaginationResponse } from '../pagination-response';

import { RestApiService } from '../rest-api.service';

@Injectable()
export class MemberService {
  constructor(private api: RestApiService) {}

  get(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/members`, cursor, limit, { include: 'teamMembers' });
  }

  spectators(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/members`, cursor, limit, { include: 'spectatingProjects', spectators: true });
  }

  list(organizationId: string): Observable<Member[]> {
    return this.api.get(`organizations/${organizationId}/members`).map(response => response.data);
  }

  find(id: string): Observable<Member> {
    return this.api.get(`members/${id}`, { include: 'organization,teamMembers.team.project' }).map(response => response.data);
  }

  findSpectator(id: string): Observable<Member> {
    return this.api.get(`members/${id}`, { include: 'spectatingProjects' }).map(response => response.data);
  }

  create(inviteId: string, userId: string) {
    return this.api.post(`users/${userId}/members`, {
      invite: inviteId,
      include: 'teamMembers.team.project'
    }).then(response => response.data);
  }

  createSpectator(inviteId: string, userId: string, projects: Project[]) {
    return this.api.post(`users/${userId}/members`, {
      invite: inviteId,
      spectator: true,
      projects: projects.map(project => project.id),
      include: 'spectatingProjects'
    }).then(response => response.data);
  }

  update(memberId: string, attributes: any) {
    return this.api.put(`members/${memberId}`, attributes).then(response => response.data);
  }

  delete(memberId: string, deleteSales: boolean) {
    return this.api.delete(`members/${memberId}`, { include: 'teamMembers.team.project', deleteSales }).then(response => response.data);
  }

  recover(memberId: string) {
    return this.api.put(`members/${memberId}`, { include: 'teamMembers.team.project' }).then(response => response.data);
  }
}
