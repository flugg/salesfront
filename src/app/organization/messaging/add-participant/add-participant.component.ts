import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { ActiveConversationService } from '../shared/active-conversation.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { MemberListService } from '../shared/member-list.service';
import { Conversation } from '../../../core/models/conversation.model';
import { Member } from '../../../core/models/member.model';

@Component({
  providers: [MemberListService],
  templateUrl: 'add-participant.component.html'
})
export class AddParticipantComponent implements OnInit, OnDestroy {
  loading = true;
  conversation: Conversation;
  members: Member[];

  private subscriptions: Subscription[] = [];

  constructor(public memberListService: MemberListService,
              private activeConversationService: ActiveConversationService,
              private conversationService: ConversationService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeConversationService.conversation,
      this.memberListService.members
    ).subscribe(data => {
      [this.conversation, this.members] = data;
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addParticipant(member: Member) {
    this.conversationService.addParticipant(this.conversation.id, member);
  }
}
