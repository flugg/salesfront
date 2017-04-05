import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/zip';

import { ConversationService } from '../shared/conversation.service';
import { MessageService } from '../shared/message.service';
import { Conversation } from '../../core/models/conversation.model';
import { Message } from '../../core/models/message.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'sf-conversation',
  templateUrl: './conversation.component.html',
})
export class ConversationComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The current message.
   */
  message: string;

  /**
   * The currently logged in user.
   */
  currentUser: User;

  /**
   * The selected conversation.
   */
  conversation: Observable<Conversation>;

  /**
   * The loaded messages.
   */
  messages: Observable<Message[]>;

  /**
   * Indicates if the conversation is locked for the given user.
   */
  isLocked = new BehaviorSubject(true);

  /**
   * The cursor for the paginated messages.
   */
  private cursor = new BehaviorSubject(30);

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
  constructor(private conversationService: ConversationService,
              private messageService: MessageService,
              private route: ActivatedRoute) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.currentUser = this.route.snapshot.parent.parent.data['currentUser'];
    this.conversation = this.conversationService.findWithUpdates(this.route.snapshot.params['id']);
    this.messages = this.messageService.getWithUpdates(this.route.snapshot.params['id'], this.cursor);

    this.subscriptions.push(Observable.zip(this.conversation, this.messages).subscribe(() => {
      this.isLoading = false;
    }));

    this.subscriptions.push(this.conversation.subscribe(conversation => {
      this.isLocked.next(this.conversationService.isLocked(conversation, this.currentUser));
      this.markLastMessageAsRead(conversation);
    }));

    this.messageService.onMessagePosted(() => {
      this.scrollToBottom();
    });
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
  sendMessage(): void {
    this.messageService.send(this.route.snapshot.params['id'], this.message).then(() => {
      this.message = '';
    });
  }

  /**
   * Load more messages.
   */
  loadMore(): void {
    this.cursor.next(30);
  }

  /**
   * Check if all messages has been loaded.
   */
  hasLoadedAll(): boolean {
    return this.cursor.isStopped;
  }

  /**
   * Indicates if the message is posted by the logged in user.
   */
  isPostedByUser(message: Message): boolean {
    return message.userId === this.currentUser.id;
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
