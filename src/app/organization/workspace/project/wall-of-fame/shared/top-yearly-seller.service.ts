import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../../../core/http/pagination-response';
import { TopMonthlySeller } from './top-monthly-seller.model';
import { TopYearlySeller } from './top-yearly-seller.model';

@Injectable()
export class TopYearlySellerService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of invites in a project.
   */
  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/top-yearly-sellers`, cursor, limit);
  }
}