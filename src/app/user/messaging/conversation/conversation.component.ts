import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import 'rxjs/add/observable/combineLatest';

import { ActiveConversationService } from '../shared/active-conversation.service';
import { MessageListService } from '../shared/message-list.service';
import { ConversationService } from '../shared/conversation.service';
import { MessageService } from '../shared/message.service';
import { Conversation } from '../shared/conversation.model';
import { Message } from '../shared/message.model';
import { User } from '../../../core/user.model';

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
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The currently logged in user.
   */
  currentUser: User;

  /**
   * The active conversation.
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
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * The message window element.
   */
  @ViewChild('window') private window: ElementRef;

  /**
   * Constructs the components.
   */
  constructor(public messageListService: MessageListService,
              private activeConversationService: ActiveConversationService,
              private conversationService: ConversationService,
              private messageService: MessageService,
              private route: ActivatedRoute) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.currentUser = this.route.snapshot.parent.parent.data['currentUser'];

    this.subscriptions.push(Observable.combineLatest(
      this.activeConversationService.conversation,
      this.messageListService.messages
    ).subscribe(data => {
      [this.conversation, this.messages] = data;

      this.isLocked.next(this.conversationService.isLocked(this.conversation, this.currentUser));
      this.markLastMessageAsRead(this.conversation);

      this.isLoading = false;
    }));

    //this.messageService.onMessagePosted(() => {
    //  this.scrollToBottom();
    //});
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
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
    return message.userId === this.currentUser.id;
  }

  /**
   * Indicates wether or not the given message should get a timestamp above it.
   */
  shouldDisplayTimestamp(message: Message): boolean {
    const index = this.messages.indexOf(message);
    if (index === this.messages.length - 1) {
      return this.messageListService.isComplete();
    }

    const previousMessage = this.messages[index + 1];
    if (previousMessage) {
      return moment.duration(moment(message.sentAt).diff(moment(previousMessage.sentAt))).asHours() > 1;
    }

    return true;
  }

  /**
   * Indicates wether or not the name of the message owner should be visible.
   */
  shouldDisplayName(message: Message): boolean {
    if (!this.conversation.group || this.isPostedByUser(message)) {
      return false;
    }

    const index = this.messages.indexOf(message);
    const previousMessage = this.messages[index + 1];
    if (previousMessage) {
      return previousMessage.userId !== message.userId || this.shouldDisplayTimestamp(message);
    }

    return true;
  }

  /**
   * Marks the last message in the active conversation as read.
   */
  private markLastMessageAsRead(conversation: Conversation): void {
    if (conversation.lastMessage) {
      const participation = conversation.participations.find(item => {
        return item.userId === this.currentUser.id;
      });

      this.conversationService.markAsRead(participation);
    }
  }

  /**
   * Scrolls the conversation window to the bottom.
   */
  private scrollToBottom(): void {
    setTimeout(() => {
      this.window.nativeElement.scrollTop = this.window.nativeElement.scrollHeight;
    }, 50);
  }
}
