import { Injectable } from '@angular/core';
import { RestApiService } from '../../../../core/http/rest-api.service';
import { Observable } from 'rxjs/Observable';
import { PaginationResponse } from '../../../../core/http/pagination-response';

@Injectable()
export class LeaderboardService {

  constructor(private api: RestApiService) { }

  /**
   * Fetches a list of sale statistics from current projects users
   */
  get(projectId: string, resource: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/leaderboards/${resource}`, cursor, limit);
  }
}
