import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/http/rest-api.service';
import { PaginationResponse } from '../../core/http/pagination-response';
import { Project } from './project.model';

@Injectable()
export class ProjectService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of projects in an organization.
   * */
  get(limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${1}/projects`, cursor, limit);
  }

  /**
   * Fetches a single project by id.
   */
  find(id: string): Observable<Project> {
    return this.api.get(`projects/${id}`).map(response => response.data);
  }

  /**
   * Creates a new project
   */
  create(): Promise<Project> {
    return this.api.post(`organizations/${1}/projects`, {}).then(response => response.data);
  }
}
