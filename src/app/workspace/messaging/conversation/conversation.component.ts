import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import * as moment from 'moment';

import { SocketApiService } from '../../../core/socket-api.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { MessageService } from '../../../core/services/message.service';
import { MessageListService } from '../shared/message-list.service';
import { ActiveConversationService } from '../shared/active-conversation.service';
import { ActiveMembershipService } from '../../../organization/active-membership.service';
import { Conversation } from '../../../core/models/conversation.model';
import { Member } from '../../../core/models/member.model';
import { Message } from '../../../core/models/message.model';
import { Participation } from '../../../core/models/participation.model';

@Component({
  providers: [
    ActiveConversationService,
    MessageListService
  ],
  templateUrl: 'conversation.component.html',
  styleUrls: ['conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  conversation: Conversation;
  messages: Message[];
  isLocked = new BehaviorSubject(true);

  @ViewChild('window') private window: ElementRef;

  private subscriptions: Subscription[] = [];

  constructor(public messageListService: MessageListService,
              private activeMembershipService: ActiveMembershipService,
              private activeConversationService: ActiveConversationService,
              private sockets: SocketApiService,
              private conversationService: ConversationService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    const hasLoaded = new Subject();

    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.activeConversationService.conversation,
      this.messageListService.messages
    ).subscribe(data => {
      [this.membership, this.conversation, this.messages] = data;
      this.isLocked.next(this.conversationService.isLocked(this.conversation, this.membership));
      this.loading = false;
      hasLoaded.next();
    }));

    hasLoaded.first().subscribe(() => {
      this.messageListService.messages.subscribe(() => this.markLastMessageAsRead());
    });

    this.activeConversationService.conversation.first().subscribe(conversation => {
      this.sockets.listenForConversation(conversation.id, {
        'message_sent': (message) => this.scrollToBottom()
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    this.isLocked.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  sendMessage(message: string): void {
    this.messageService.send(this.conversation.id, message);
  }

  isPostedByUser(message: Message): boolean {
    return message.memberId === this.membership.id;
  }

  shouldDisplayName(message: Message): boolean {
    if (!this.conversation.group || this.isPostedByUser(message)) {
      return false;
    }

    const previousMessage = this.messages[this.messages.indexOf(message) + 1];
    return previousMessage ? previousMessage.memberId !== message.memberId || this.shouldDisplayTimestamp(message) : true;
  }

  shouldDisplayTimestamp(message: Message): boolean {
    const index = this.messages.indexOf(message);
    if (index === this.messages.length - 1) {
      return this.messageListService.isComplete();
    }

    const previousMessage = this.messages[index + 1];
    return previousMessage ? moment.duration(moment(message.sentAt).diff(moment(previousMessage.sentAt))).asHours() > 1 : true;
  }

  private markLastMessageAsRead(): void {
    if (!this.hasReadLastMessage()) {
      this.conversationService.markAsRead(this.getUserParticipation());
    }
  }

  private hasReadLastMessage(): boolean {
    return this.getUserParticipation().lastReadMessageId === this.conversation.lastMessageId;
  }

  private getUserParticipation(): Participation {
    return this.conversation.participations.find(participation => participation.memberId === this.membership.id);
  }

  private scrollToBottom(): void {
    setTimeout(() => this.window.nativeElement.scrollTop = this.window.nativeElement.scrollHeight, 50);
  }
}
