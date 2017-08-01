import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { UnreadConversationService } from '../../shared/unread-conversation.service';
import { Conversation } from '../messaging/shared/conversation.model';
import { ActiveUserService } from '../../active-user.service';
import { Participation } from '../messaging/shared/participation.model';
import { Message } from '../messaging/shared/message.model';

@Injectable()
export class UnreadConversationListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of conversations.
   */
  readonly conversations: Observable<Conversation[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private activeUser: ActiveUserService,
              private unreadConversationService: UnreadConversationService) {
    super();

    this.paginator.subscribe(limit => {
      this.unreadConversationService.get().subscribe(conversations => this.set(conversations));
    });

    this.activeUser.user.subscribe(user => {
      this.sockets.listenForUser(user.id, {
        'last_message_read': participation => this.updateConversation(participation),
        'message_sent': message => this.addConversation(message),
      }, this);
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  /**
   * Updates the conversation from the given participation.
   */
  private updateConversation(participation: Participation) {
    this.snapshot = this.snapshot.filter(item => item.id !== participation.conversationId);

    this.updateFromSnapshot();
  }

  /**
   * Adds a conversation.
   */
  private addConversation(message: Message) {
    const conversation = this.snapshot.find(item => item.id === message.conversationId);

    if (! conversation) {
      this.snapshot.push(message.conversation);

      this.updateFromSnapshot();
    }
  }
}