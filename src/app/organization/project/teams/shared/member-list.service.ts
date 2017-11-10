import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Session } from '../../../../core/models/session.model';
import { TeamMember } from '../../../../core/models/team-member.model';
import { ObservableResourceList } from '../../../../core/observable-resource-list';
import { TeamMemberService } from '../../../../core/services/team-member.service';
import { SocketApiService } from '../../../../core/socket-api.service';
import { ActiveProjectService } from '../../../active-project.service';
import { SelectedTeamService } from '../team-profile/selected-team.service';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {
  readonly members: Observable<TeamMember[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private selectedTeam: SelectedTeamService,
              private activeProject: ActiveProjectService,
              private teamMemberService: TeamMemberService) {
    super();

    this.selectedTeam.team.first().subscribe(team => {
      this.paginator.subscribe(limit => {
        this.pagination(this.teamMemberService.get(team.id, limit, this.cursor)).map(members => {
          return members.filter(member => !member.leftAt && !member.member.deletedAt);
        }).subscribe(members => {
          this.add(members);
        });
      });
    });

    this.activeProject.project.first().subscribe(project => {
      this.sockets.listenForProject(project.id, {
        'team_member_added': member => this.add([member]),
        'team_member_updated': member => this.updateTeamMember(member),
        'team_member_removed': member => this.removeTeamMember(member),
        'clocked_in': session => this.setActiveSession(session),
        'clocked_out': session => this.removeActiveSession(session)
      }, this);
    });
  }

  protected add(resources: any[]): void {
    super.add(resources);
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private updateTeamMember(member: TeamMember) {
    if (!member.leftAt) {
      this.snapshot = this.snapshot.map(item => item.id === member.id ? member : item);

      this.updateFromSnapshot();
    }
  }

  private removeTeamMember(member: TeamMember) {
    this.snapshot = this.snapshot.filter(item => item.id !== member.id);
    this.updateFromSnapshot();
  }

  private setActiveSession(session: Session) {
    this.snapshot.forEach(teamMember => {
      if (teamMember.memberId === session.memberId) {
        teamMember.member.activeSession = session;
      }
    });

    this.updateFromSnapshot();
  }

  private removeActiveSession(session: Session) {

    this.snapshot.forEach(teamMember => {
      if (teamMember.memberId === session.memberId) {
        teamMember.member.activeSession = null;
      }
    });

    this.updateFromSnapshot();
  }
}
