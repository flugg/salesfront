import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { SelectedTeamService } from '../team-profile/selected-team.service';
import { TeamMember } from '../../../../shared/team-member.model';
import { TeamMemberService } from '../../../../shared/team-member.service';
import { ActiveProjectService } from '../../../shared/active-project.service';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of team members.
   */
  readonly members: Observable<TeamMember[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private selectedTeam: SelectedTeamService,
              private activeProject: ActiveProjectService,
              private sockets: SocketApiService,
              private teamMemberService: TeamMemberService) {
    super();

    this.selectedTeam.team.first().subscribe(team => {
      this.paginator.subscribe(limit => {
        this.pagination(this.teamMemberService.get(team.id, limit, this.cursor))
          .map(members => {
            return members.filter(member => !member.leftAt);
          }).subscribe(members => this.add(members));
      });
    });

    this.activeProject.project.first().subscribe(project => {
      this.sockets.listenForProject(project.id, {
        'team_member_added': member => this.add([member]),
        'team_member_updated': member => this.updateTeamMember(member),
        'team_member_removed': member => this.removeTeamMember(member)
      }, this);
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
   * Updates a team member in the list.
   */
  private updateTeamMember(member: TeamMember) {
    if (!member.leftAt) {
      this.snapshot = this.snapshot.map(item => item.id === member.id ? member : item);

      this.updateFromSnapshot();
    }
  }

  /**
   * Removes a team member from the list.
   */
  private removeTeamMember(member: TeamMember) {
    this.snapshot = this.snapshot.filter(item => item.id !== member.id);

    this.updateFromSnapshot();
  }
}
