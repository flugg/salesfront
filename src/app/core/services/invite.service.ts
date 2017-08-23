import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Invite } from '../models/invite.model';
import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';

@Injectable()
export class InviteService {
  constructor(private api: RestApiService) {}

  get(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/invites`, cursor, limit);
  }

  find(id: string): Observable<Invite> {
    return this.api.get(`invites/${id}`).map(response => response.data);
  }

  sendInvite(organizationId: string, email: string) {
    return this.api.post(`organizations/${organizationId}/invites`, { email }).then(response => response.data);
  }
}
