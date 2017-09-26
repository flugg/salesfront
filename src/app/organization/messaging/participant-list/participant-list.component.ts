import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { ActiveConversationService } from '../shared/active-conversation.service';
import { ActiveMembershipService } from '../../active-membership.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { Conversation } from '../../../core/models/conversation.model';
import { Member } from '../../../core/models/member.model';
import { Participation } from '../../../core/models/participation.model';

@Component({
  templateUrl: 'participant-list.component.html'
})
export class ParticipantListComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  conversation: Conversation;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private activeMembershipService: ActiveMembershipService,
              private activeConversationService: ActiveConversationService,
              private conversationService: ConversationService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.activeConversationService.conversation
    ).subscribe(data => {
      [this.membership, this.conversation] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  removeParticipant(participation: Participation) {
    this.conversationService.removeParticipant(participation);

    if (participation.memberId === this.membership.id) {
      this.router.navigate(['messages', this.conversation.id]);
    }
  }
}
