import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private api: RestApiService) {}

  list(limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate('users', cursor, limit);
  }

  find(id: string, relations?: string[]): Observable<User> {
    return this.api.get(`users/${id}`, { include: relations }).map(response => response.data);
  }

  register(attributes: any) {
    return this.api.post('users', attributes).then(response => response.data);
  }

  update(userId: string, attributes: any) {
    return this.api.put(`users/${userId}`, attributes).then(response => response.data);
  }
}
