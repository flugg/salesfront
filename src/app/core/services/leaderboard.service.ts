import { Injectable } from '@angular/core';
import { Moment } from 'moment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Member } from '../models/member.model';
import { Team } from '../models/team.model';
import { RestApiService } from '../rest-api.service';

@Injectable()
export class LeaderboardService {
  constructor(private api: RestApiService) {}

  members(projectId: string, after: Moment, before: Moment): Observable<Member[]> {
    return this.api.get(`projects/${projectId}/leaderboard-users`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  membersInTeam(teamId: string, after: Moment, before: Moment): Observable<Member[]> {
    return this.api.get(`teams/${teamId}/leaderboard-users`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  teams(projectId: string, after: Moment, before: Moment): Observable<Team[]> {
    return this.api.get(`projects/${projectId}/leaderboard-teams`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  projects(organizationId: string, after: Moment, before: Moment): Observable<Team[]> {
    return this.api.get(`organizations/${organizationId}/leaderboard-projects`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }
}
