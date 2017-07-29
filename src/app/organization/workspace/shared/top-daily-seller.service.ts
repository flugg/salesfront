import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../core/http/pagination-response';

@Injectable()
export class TopDailySellerService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of invites in a project.
   */
  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/top-daily-sellers`, cursor, limit, {include: 'membership.user'});
  }

  /**
   * Fetches a list of invites for a membership.
   */
  getForMembership(membershipId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`memberships/${membershipId}/top-daily-sellers`, cursor, limit, {include: 'membership.user'});
  }
}
