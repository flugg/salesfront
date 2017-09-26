import { Component, OnInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Member } from '../../../core/models/member.model';
import { User } from '../../../core/models/user.model';
import { ActiveUserService } from '../../../organization-list/active-user.service';
import { InviteListService } from './invite-list/invite-list.service';
import { MemberListService } from './member-list/member-list.service';

@Component({
  providers: [InviteListService, MemberListService],
  selector: 'vmo-user-tabs',
  templateUrl: 'user-tabs.component.html'
})
export class UserTabsComponent implements OnInit, OnDestroy {
  loading = true;
  members: Member[];
  user: User;

  private subscriptions: Subscription[] = [];

  constructor(private memberListService: MemberListService,
              private activeUser: ActiveUserService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.memberListService.members,
      this.activeUser.user
    ).subscribe(data => {
      [this.members, this.user] = data;

      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
