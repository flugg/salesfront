import { Injectable } from '@angular/core';

import { RestApiService } from '../../core/http/rest-api.service';
import { Session } from './session.model';

@Injectable()
export class SessionService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Clocks in a new session.
   */
  clockIn(teamMemberId: string): Promise<Session> {
    return this.api.post(`team-members/${teamMemberId}/sessions`, {}).then(response => response.data);
  }

  /**
   * Clocks in a new session.
   */
  clockOut(session: Session): Promise<Session> {
    return this.api.delete(`sessions/${session.id}`, {}).then(response => response.data);
  }
}
