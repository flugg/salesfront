import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { MessageService } from '../../../core/services/message.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { ActiveMembershipService } from '../../active-membership.service';
import { MemberListService } from '../shared/member-list.service';
import { Member } from '../../../core/models/member.model';

@Component({
  providers: [MemberListService],
  templateUrl: 'start-conversation.component.html',
  styleUrls: ['start-conversation.component.scss']
})
export class StartConversationComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  members: Member[];
  participants: Member[] = [];

  @ViewChild('chips') private chipsContainer: ElementRef;

  private subscriptions: Subscription[] = [];

  constructor(public memberListService: MemberListService,
              private router: Router,
              private route: ActivatedRoute,
              private activeMembershipService: ActiveMembershipService,
              private conversationService: ConversationService,
              private messageService: MessageService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.memberListService.members
    ).subscribe(data => {
      [this.membership, this.members] = data;
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addParticipant(member: Member): void {
    if (this.participants.indexOf(member) === -1) {
      this.participants.push(member);
    }
    this.scrollToBottom();
  }

  removeParticipant(member: Member): void {
    this.participants.splice(this.participants.indexOf(member), 1);
  }

  start(message: string): void {
    this.loading = true;
    this.conversationService.start(this.membership.organizationId, this.participants).then(conversation => {
      this.messageService.send(conversation.id, message).then(() => {
        this.router.navigate(['..', conversation.id], { relativeTo: this.route });
        this.loading = false;
      });
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => this.chipsContainer.nativeElement.scrollTop = this.chipsContainer.nativeElement.scrollHeight, 50);
  }
}
