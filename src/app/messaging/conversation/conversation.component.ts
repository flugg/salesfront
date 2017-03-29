import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Conversation } from '../../core/models/conversation.model';
import { ConversationService } from '../shared/conversation.service';
import { MessageService } from '../shared/message.service';
import { AuthService } from '../../core/auth/auth.service';
import { Message } from '../../core/models/message.model';

@Component({
  selector: 'sf-conversation',
  templateUrl: './conversation.component.html',
})
export class ConversationComponent implements OnInit {

  /**
   * The selected conversation.
   */
  private conversation: Conversation;

  /**
   * The loaded messages.
   */
  private messages: Message[];

  /**
   * The current message.
   */
  public message: string;

  /**
   * The current cursor of the paginated messages.
   */
  private messageCursor: BehaviorSubject<number>;

  /**
   * The current message.
   */
  @ViewChild('conversationWindow') private conversationWindow: ElementRef;

  /**
   * Constructs the components.
   */
  constructor(private conversationService: ConversationService,
              private messageService: MessageService,
              private auth: AuthService,
              private route: ActivatedRoute) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.conversationService.findWithUpdates(this.route.snapshot.params['id']).subscribe(conversation => {
      this.conversation = conversation;
    });

    this.messageCursor = new BehaviorSubject(30);
    this.messageService.getWithUpdates(this.route.snapshot.params['id'], this.messageCursor).subscribe(messages => {
      this.messages = messages;
    });

    this.messageService.onMessagePosted(() => {
      this.scrollToBottom();
    });
  }

  /**
   * Sends a message to the conversation.
   */
  sendMessage(body: string) {
    this.messageService.send(this.conversation, body).then(() => {
      this.message = '';
    });
  }

  /**
   * Load more messages.
   */
  loadMore() {
    this.messageCursor.next(30);
  }

  /**
   * Check if all messages has been loaded.
   */
  hasLoadedAll() {
    return this.messageCursor.isStopped;
  }

  /**
   * Scrolls the conversation window to the bottom.
   */
  scrollToBottom() {
    setTimeout(() => {
      this.conversationWindow.nativeElement.scrollTop = this.conversationWindow.nativeElement.scrollHeight;
    }, 50);
  }

  /**
   * Indicates if the message is posted by the logged in user.
   */
  isPostedByUser(message: Message) {
    // console.log(this.auth.user().map(user => user.id === message.userId));
    return this.auth.user().map(user => user.id === message.userId);
  }
}
