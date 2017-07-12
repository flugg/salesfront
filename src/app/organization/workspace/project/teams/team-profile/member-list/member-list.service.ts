import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../../core/sockets/socket-api.service';
import { SelectedTeamService } from '../selected-team.service';
import { TeamMember } from '../../../../../shared/team-member.model';
import { TeamMemberService } from '../../../../../shared/team-member.service';

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
              private sockets: SocketApiService,
              private teamMemberService: TeamMemberService) {
    super();

    this.selectedTeam.team.subscribe(team => {
      this.paginator.subscribe(limit => {
        this.pagination(this.teamMemberService.get(team.id, limit, this.cursor))
          .subscribe(memberships => this.add(memberships));
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
}
