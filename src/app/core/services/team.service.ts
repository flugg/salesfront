import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { Team } from '../models/team.model';

@Injectable()
export class TeamService {
  constructor(private api: RestApiService) {}

  getAll(projectId: string): Observable<Team[]> {
    return this.api.get(`projects/${projectId}/teams`, {include: 'members.member.user'}).map(response => response.data);
  }

  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/teams`, cursor, limit);
  }

  find(id: string): Observable<Team> {
    return this.api.get(`teams/${id}`).map(response => response.data);
  }

  create(projectId: string, name): Promise<Team> {
    return this.api.post(`projects/${projectId}/teams`, {name}).then(response => response.data);
  }

  update(teamId: string, attributes: any) {
    return this.api.put(`teams/${teamId}`, attributes).then(response => response.data);
  }
}