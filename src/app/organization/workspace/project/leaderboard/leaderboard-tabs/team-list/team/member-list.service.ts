import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../../../../../core/sockets/observable-resource-list';
import { UserListService } from '../../user-list/user-list.service';
import { Membership } from '../../../../../../shared/membership.model';

@Injectable()
export class MemberListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of teams.
   */
  readonly members: Observable<Membership[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private userList: UserListService) {
    super();

    this.userList.members.map(members => members.filter(member => member.teamId === route.snapshot.params.team))
      .subscribe(members => this.set(members));
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
