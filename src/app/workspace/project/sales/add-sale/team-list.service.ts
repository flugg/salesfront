import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveMembershipService } from '../../../../organization/active-membership.service';
import { ActiveProjectService } from '../../../active-project.service';
import { TeamService } from '../../../../core/services/team.service';
import { Team } from '../../../../core/models/team.model';
import { Member } from '../../../../core/models/member.model';

@Injectable()
export class TeamListService extends ObservableResourceList implements OnDestroy {
  readonly teams: Observable<Team[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMemberService: ActiveMembershipService,
              private activeProjectService: ActiveProjectService,
              private teamService: TeamService) {
    super();

    this.activeMemberService.membership.first().subscribe(membership => {
      this.activeProjectService.project.first().subscribe(project => {
        this.teamService.getAll(project.id).subscribe(teams => {
          this.set(this.filterTeams(membership, teams));
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  filterTeams(membership: Member, teams: Team[]): Team[] {
    if (membership.user.isAdmin) {
      return teams;
    }

    return teams.map(team => {
      const member = membership.teamMembers.find(teamMember => teamMember.teamId === team.id);

      if (member) {
        if (!member.isLeader) {
          team.members = team.members.filter(teamMember => teamMember.id === member.id);
        }
      } else {
        team.members = [];
      }

      return team;
    }).filter(team => team.members.length);
  }
}