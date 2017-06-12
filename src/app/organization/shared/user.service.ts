import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/http/rest-api.service';
import { PaginationResponse } from '../../core/http/pagination-response';
import { User } from './user.model';

@Injectable()
export class UserService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of users.
   */
  get(limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate('users', cursor, limit);
  }

  /**
   * Fetches a single user by id.
   */
  find(id: string): Observable<User> {
    return this.api.get(`users/${id}`).map(response => response.data);
  }

  /**
   * Updates the given user.
   */
  update(userId: string, attributes: any) {
    return this.api.put(`users/${userId}`, attributes).then(response => response.data);
  }
}
