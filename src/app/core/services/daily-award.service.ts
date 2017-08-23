import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';

@Injectable()
export class DailyAwardService {
  constructor(private api: RestApiService) {}

  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/daily-awards`, cursor, limit, { include: 'awardable.user' });
  }

  getForMember(memberId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`members/${memberId}/daily-awards`, cursor, limit, { include: 'awardable.user' });
  }

  teams(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/daily-team-awards`, cursor, limit, { include: 'awardable' });
  }
}
