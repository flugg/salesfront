import { Injectable } from '@angular/core';
import { Moment } from 'moment';

import { Session } from '../models/session.model';
import { RestApiService } from '../rest-api.service';

@Injectable()
export class SessionService {
  constructor(private api: RestApiService) {}

  clockIn(teamMemberId: string, clockOut?: Moment): Promise<Session> {
    if (clockOut != null) {
      console.log(clockOut);
      console.log(clockOut.toISOString());

      return this.api.post(`team-members/${teamMemberId}/sessions`, { clockOut: clockOut.toISOString() }).then(response => response.data);
    }

    return this.api.post(`team-members/${teamMemberId}/sessions`).then(response => response.data);
  }

  clockOut(session: Session): Promise<Session> {
    return this.api.delete(`sessions/${session.id}`, {}).then(response => response.data);
  }
}
