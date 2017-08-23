import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';

@Injectable()
export class MonthlyAwardService {
  constructor(private api: RestApiService) {}

  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/monthly-awards`, cursor, limit, {include: 'awardable.user'});
  }

  getForMembership(membershipId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`memberships/${membershipId}/monthly-awards`, cursor, limit, {include: 'member.user'});
  }

  teams(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/monthly-team-awards`, cursor, limit, {include: 'awardable'});
  }
}
