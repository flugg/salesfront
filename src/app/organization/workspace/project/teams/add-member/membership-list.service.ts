import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { ActiveProjectService } from '../../../shared/active-project.service';
import { Membership } from '../../../../shared/membership.model';
import { MembershipService } from '../../../../shared/membership.service';
import { TeamMember } from '../../../../shared/team-member.model';

@Injectable()
export class MembershipListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of team members.
   */
  readonly memberships: Observable<Membership[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private activeProject: ActiveProjectService,
              private sockets: SocketApiService,
              private membershipService: MembershipService) {
    super();

    this.activeProject.project.first().subscribe(project => {
      this.paginator.subscribe(limit => {
        this.pagination(this.membershipService.getForProject(project.id, limit, this.cursor))
          .subscribe(memberships => this.add(memberships));
      });

      this.sockets.listenForProject(project.id, {
        'team_member_added': member => this.updateTeamMember(member),
        'team_member_removed': member => this.updateTeamMember(member)
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
    let membership = this.snapshot.find(item => item.id === member.membershipId);
    if (!membership) {
      return;
    }

    membership.teamMembers = membership.teamMembers.filter(item => item.id !== member.id);

    if (!member.leftAt) {
      membership.teamMembers.push(member);
    }

    this.updateFromSnapshot();
  }
}
