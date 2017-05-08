import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import * as moment from 'moment';

import { ActiveConversationService } from '../shared/active-conversation.service';
import { ActiveUserService } from '../../../core/auth/active-user.service';
import { MessageListService } from '../shared/message-list.service';
import { ConversationService } from '../shared/conversation.service';
import { MessageService } from '../shared/message.service';
import { Conversation } from '../shared/conversation.model';
import { Message } from '../shared/message.model';
import { Participation } from '../shared/participation.model';
import { User } from '../../../core/user.model';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  providers: [
    ActiveConversationService,
    MessageListService
  ],
  templateUrl: 'conversation.component.html',
  styleUrls: ['conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * The selected conversation.
   */
  conversation: Conversation;

  /**
   * The loaded messages.
   */
  messages: Message[];

  /**
   * Indicates if the conversation is locked for the given user.
   */
  isLocked = new BehaviorSubject(true);

  /**
   * The message window element.
   */
  @ViewChild('window') private window: ElementRef;

  /**
   * List of selectAll observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the components.
   */
  constructor(public messageList: MessageListService,
              private activeUser: ActiveUserService,
              private activeConversation: ActiveConversationService,
              private sockets: SocketApiService,
              private conversationService: ConversationService,
              private messageService: MessageService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    const hasLoaded = new Subject();

    this.subscriptions.push(Observable.combineLatest(
      this.activeUser.user,
      this.activeConversation.conversation,
      this.messageList.messages
    ).subscribe(data => {
      [this.user, this.conversation, this.messages] = data;
      this.isLocked.next(this.conversationService.isLocked(this.conversation, this.user));
      this.loading = false;
      hasLoaded.next();
    }));

    hasLoaded.first().subscribe(() => {
      this.messageList.messages.subscribe(() => this.markLastMessageAsRead());
    });

    this.activeConversation.conversation.first().subscribe(conversation => {
      this.sockets.listenForConversation(conversation.id, {
        'message_sent': (message) => this.scrollToBottom()
      }, this);
    });
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    this.isLocked.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Sends a message to the conversation.
   */
  sendMessage(message: string): void {
    this.messageService.send(this.conversation.id, message);
  }

  /**
   * Indicates if the message is posted by the logged in user.
   */
  isPostedByUser(message: Message): boolean {
    return message.userId === this.user.id;
  }

  /**
   * Indicates wether or not the name of the message owner should be visible.
   */
  shouldDisplayName(message: Message): boolean {
    if (!this.conversation.group || this.isPostedByUser(message)) {
      return false;
    }

    const previousMessage = this.messages[this.messages.indexOf(message) + 1];
    return previousMessage ? previousMessage.userId !== message.userId || this.shouldDisplayTimestamp(message) : true;
  }

  /**
   * Indicates wether or not the given message should get a timestamp above it.
   */
  shouldDisplayTimestamp(message: Message): boolean {
    const index = this.messages.indexOf(message);
    if (index === this.messages.length - 1) {
      return this.messageList.isComplete();
    }

    const previousMessage = this.messages[index + 1];
    return previousMessage ? moment.duration(moment(message.sentAt).diff(moment(previousMessage.sentAt))).asHours() > 1 : true;
  }

  /**
   * Marks the last message in the conversation as read.
   */
  private markLastMessageAsRead(): void {
    if (!this.hasReadLastMessage()) {
      this.conversationService.markAsRead(this.getUserParticipation());
    }
  }

  /**
   * Checks if the current user has read the last message.
   */
  private hasReadLastMessage(): boolean {
    return this.getUserParticipation().lastReadMessageId === this.conversation.lastMessageId;
  }

  /**
   * Gets the user participation from the conversation.
   */
  private getUserParticipation(): Participation {
    return this.conversation.participations.find(participation => participation.userId === this.user.id);
  }

  /**
   * Scrolls the conversation window to the bottom.
   */
  private scrollToBottom(): void {
    setTimeout(() => this.window.nativeElement.scrollTop = this.window.nativeElement.scrollHeight, 50);
  }
}
