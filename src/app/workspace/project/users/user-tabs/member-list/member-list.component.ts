import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/combineLatest';

import { MemberListService } from './member-list.service';
import { Member } from '../../../../../core/models/member.model';
import { ActiveMembershipService } from '../../../../../organization/active-membership.service';

@Component({
  templateUrl: 'member-list.component.html'
})
export class MemberListComponent implements OnInit, OnDestroy {
  loading = true;
  members: Member[];
  activeMembership: Member;

  private subscriptions: Subscription[] = [];

  constructor(public memberListService: MemberListService,
              private activeMembershipService: ActiveMembershipService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.memberListService.members,
      this.activeMembershipService.membership
    ).subscribe(data => {
      [this.members, this.activeMembership] = data;

      if (!this.activeMembership.user.isAdmin) {
        this.members = this.members.filter(member => !member.deletedAt);
      }

      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
