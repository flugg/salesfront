import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/http/rest-api.service';
import { PaginationResponse } from '../../core/http/pagination-response';
import { Project } from '../../core/project.model';
import { Sale } from './sale.model';

@Injectable()
export class SaleService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of sales for a project.
   */
  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/sales`, cursor, limit);
  }

  /**
   * Fetches a list of sales for a team-profile.
   */
  getForTeam(teamId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`teams/${teamId}/sales`, cursor, limit);
  }

  /**
   * Registers a sale in the given project.
   */
  register(project: Project): Promise<Sale> {
    return this.api.post(`teams/${project.id}/sales`).then(response => response.data);
  }
}
