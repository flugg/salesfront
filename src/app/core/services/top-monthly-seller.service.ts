import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';

@Injectable()
export class TopMonthlySellerService {
  constructor(private api: RestApiService) {}

  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/top-monthly-sellers`, cursor, limit);
  }
}
