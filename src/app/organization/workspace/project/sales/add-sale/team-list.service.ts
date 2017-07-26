import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { TeamService } from '../../shared/team.service';
import { Team } from '../../shared/team.model';
import { ActiveMembershipService } from '../../../active-membership.service';
import { Membership } from '../../../../shared/membership.model';

@Injectable()
export class TeamListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of teams.
   */
  readonly teams: Observable<Team[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeMembership: ActiveMembershipService,
              private sockets: SocketApiService,
              private teamService: TeamService) {
    super();

    this.activeMembership.membership.first().subscribe(membership => {
      this.teamService.getAll(membership.projectId).subscribe(teams => {
        this.set(this.filterTeams(membership, teams));
      });
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  /**
   * Filters the teams.
   */
  filterTeams(membership: Membership, teams: Team[]): Team[] {
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