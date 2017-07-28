import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResource } from '../../../../../core/sockets/observable-resource';
import { SocketApiService } from '../../../../../core/sockets/socket-api.service';
import { TeamService } from '../../shared/team.service';
import { Team } from '../../shared/team.model';
import { ActiveProjectService } from '../../../shared/active-project.service';
import { User } from '../../../../shared/user.model';
import { Membership } from '../../../../shared/membership.model';
import { MembershipService } from '../../../../shared/membership.service';

@Injectable()
export class SelectedMembershipService extends ObservableResource implements OnDestroy {

  /**
   * The observable selected membership.
   */
  readonly membership: Observable<Membership> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private activeProject: ActiveProjectService,
              private membershipService: MembershipService) {
    super();

    this.membershipService.find(this.route.snapshot.params['member']).subscribe(membership => this.set(membership));

    this.activeProject.project.first().subscribe(project => {
      this.sockets.listenForProject(project.id, {
        'user_updated': user => this.updateUser(user)
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
   * Updates a user in the list.
   */
  private updateUser(user: User) {
    console.log(this.snapshot);
    console.log(user);
    if (user.id === this.snapshot.userId) {
      this.snapshot.user = user;

      this.updateFromSnapshot();
    }
  }
}