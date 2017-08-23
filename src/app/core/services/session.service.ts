import { Injectable } from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { Session } from '../models/session.model';

@Injectable()
export class SessionService {
  constructor(private api: RestApiService) {}

  clockIn(teamMemberId: string): Promise<Session> {
    return this.api.post(`team-members/${teamMemberId}/sessions`, {}).then(response => response.data);
  }

  clockOut(session: Session): Promise<Session> {
    return this.api.delete(`sessions/${session.id}`, {}).then(response => response.data);
  }
}
