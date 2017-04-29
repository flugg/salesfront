import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../core/http/pagination-response';
import { Invite } from '../shared/invite.model';

@Injectable()
export class InviteService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of invites in a project.
   */
  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/invites`, cursor, limit);
  }

  /**
   * Fetches a single invite by id.
   */
  find(id: string): Observable<Invite> {
    return this.api.get(`invites/${id}`).map(response => response.data);
  }

  /**
   * Sends an invite to the given email.
   **/
  sendInvite(projectId: string, email: string) {
    return this.api.post(`/projects/${projectId}/invites`, { email }).then(response => response.data);
  }
}
