import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../../core/http/pagination-response';
import { Team } from './team.model';

@Injectable()
export class TeamService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {
  }

  /**
   * Fetches a list of teams in a project.
   */
  getAll(projectId: string): Observable<Team[]> {
    return this.api.get(`projects/${projectId}/teams`, {include: 'members.membership.user'}).map(response => response.data);
  }

  /**
   * Fetches a list of teams in a project.
   */
  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/teams`, cursor, limit);
  }

  /**
   * Fetches a single team by id.
   */
  find(id: string): Observable<Team> {
    return this.api.get(`teams/${id}`).map(response => response.data);
  }

  /**
   * Creates a new team.
   */
  create(projectId: string, name): Promise<Team> {
    return this.api.post(`projects/${projectId}/teams`, {name}).then(response => response.data);
  }
}