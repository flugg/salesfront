import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../../../core/http/pagination-response';

@Injectable()
export class MembershipService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of memberships in a projet.
   */
  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/memberships`, cursor, limit);
  }
}
