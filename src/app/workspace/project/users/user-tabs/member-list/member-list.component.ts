import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MemberListService } from './member-list.service';
import { Member } from '../../../../../core/models/member.model';

@Component({
  templateUrl: 'member-list.component.html'
})
export class MemberListComponent implements OnInit, OnDestroy {
  loading = true;
  members: Member[];

  private subscriptions: Subscription[] = [];

  constructor(public memberListService: MemberListService) {}

  ngOnInit() {
    this.subscriptions.push(this.memberListService.members.subscribe(members => {
      this.members = members;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
