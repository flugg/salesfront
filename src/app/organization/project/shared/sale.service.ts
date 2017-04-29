import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../core/http/pagination-response';

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
   * Fetches a list of sales for a team.
   */
  getForTeam(teamId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`teams/${teamId}/sales`, cursor, limit);
  }
}
