import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { ConversationListService } from '../shared/conversation-list.service';
import { ActiveMembershipService } from '../../../organization/active-membership.service';
import { Conversation } from '../../../core/models/conversation.model';
import { Member } from '../../../core/models/member.model';

@Component({
  providers: [ConversationListService],
  templateUrl: 'conversation-list.component.html'
})
export class ConversationListComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  conversations: Conversation[];

  private subscriptions: Subscription[] = [];

  constructor(public conversationListService: ConversationListService,
              private activeMembershipService: ActiveMembershipService) {}

  ngOnInit(): void {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.conversationListService.conversations
    ).subscribe(data => {
      [this.membership, this.conversations] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  hasUnreadMessages(conversation: Conversation): boolean {
    const participation = conversation.participations.find(item => item.memberId === this.membership.id);

    if (!participation) {
      return false;
    }

    if (participation.lastReadMessage && conversation.lastMessage) {
      return participation.lastReadMessage.id !== conversation.lastMessage.id;
    }

    return false;
  }
}
