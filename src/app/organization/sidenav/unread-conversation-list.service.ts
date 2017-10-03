import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Conversation } from '../../core/models/conversation.model';
import { Message } from '../../core/models/message.model';
import { Participation } from '../../core/models/participation.model';
import { ObservableResourceList } from '../../core/observable-resource-list';
import { UnreadConversationService } from '../../core/services/unread-conversation.service';
import { SocketApiService } from '../../core/socket-api.service';
import { ActiveMembershipService } from '../../organization/active-membership.service';

@Injectable()
export class UnreadConversationListService extends ObservableResourceList implements OnDestroy {
  readonly conversations: Observable<Conversation[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private unreadConversationService: UnreadConversationService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.sockets.stopListening(this);

      this.activeMembershipService.membership.subscribe(membership => {
        this.unreadConversationService.list(membership.organizationId).subscribe(conversations => this.set(conversations));

        this.sockets.listenForUser(membership.userId, {
          'last_message_read': participation => this.updateConversation(participation),
          'message_sent': message => this.addConversation(message)
        }, this);
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private updateConversation(participation: Participation) {
    this.snapshot = this.snapshot.filter(item => item.id !== participation.conversationId);

    this.updateFromSnapshot();
  }

  private addConversation(message: Message) {
    const conversation = this.snapshot.find(item => item.id === message.conversationId);

    if (!conversation) {
      this.snapshot.push(message.conversation);
      this.updateFromSnapshot();
    }
  }
}