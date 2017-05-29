import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Moment } from 'moment';

import { RestApiService } from '../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../core/http/pagination-response';
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
   * Fetches a list of sales for a project.
   */
  getForProject(projectId: string, after?: Moment, before?: Moment): Observable<Sale[]> {
    return this.api.get(`projects/${projectId}/sales`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  /**
   * Fetches a list of sales for a team-profile.
   */
  getForTeam(teamId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`teams/${teamId}/sales`, cursor, limit);
  }

  /**
   * Fetches a list of sales for a user.
   */
  getForMember(membershipId: string, after?: Moment, before?: Moment): Observable<Sale[]> {
    return this.api.get(`memberships/${membershipId}/sales`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  /**
   * Registers a sale for the given membership.
   */
  register(membershipId: string, date?: Moment): Promise<Sale> {
    return this.api.post(`memberships/${membershipId}/sales`, !date ? {} : {
      date: date.toISOString() || moment().toISOString()
    }).then(response => response.data);
  }
}
