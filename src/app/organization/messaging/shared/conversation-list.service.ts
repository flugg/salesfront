import { Injectable, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Conversation } from '../../../core/models/conversation.model';
import { Message } from '../../../core/models/message.model';
import { Participation } from '../../../core/models/participation.model';

import { ObservableResourceList } from '../../../core/observable-resource-list';
import { ConversationService } from '../../../core/services/conversation.service';
import { MessageService } from '../../../core/services/message.service';
import { SocketApiService } from '../../../core/socket-api.service';
import { ActiveMembershipService } from '../../active-membership.service';

@Injectable()
export class ConversationListService extends ObservableResourceList implements OnDestroy {
  readonly conversations: Observable<Conversation[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private conversationService: ConversationService,
              private messageService: MessageService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.cursor = null;
      this.snapshot = [];
      this.sockets.stopListening(this);

      this.activeMembershipService.membership.subscribe(membership => {
        this.paginator.subscribe(limit => {
          this.pagination(this.conversationService.get(membership.organizationId, limit, this.cursor))
            .subscribe(conversations => this.add(conversations));
        });

        this.sockets.listenForUser(membership.userId, {
          'conversation_started': (conversation) => this.addConversation(conversation),
          'message_sent': (message) => this.setLastMessage(message),
          'last_message_read': (participation) => this.setParticipant(participation),
          'participant_added': (participation) => this.addParticipant(participation),
          'participant_removed': (participation) => this.setParticipant(participation)
        }, this);
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addConversation(conversation: Conversation) {
    this.conversationService.find(conversation.id).subscribe(item => {
      this.snapshot.unshift(item);
      this.updateFromSnapshot();
    })
  }

  private setLastMessage(message: Message) {
    const conversation = this.snapshot.find(item => item.id === message.conversationId);

    if (conversation) {
      conversation.lastMessage = message;
      conversation.lastMessageId = message.id;
      this.moveToFront(conversation);
    }
  }

  private moveToFront(conversation: Conversation) {
    this.snapshot = this.snapshot.filter(item => item.id !== conversation.id);
    this.snapshot.unshift(conversation);
    this.updateFromSnapshot();
  }

  private addParticipant(participation: Participation) {
    const conversation = this.snapshot.find(item => item.id === participation.conversationId);

    if (conversation) {
      conversation.participations.push(participation);
      this.updateFromSnapshot();
    }
  }

  private setParticipant(participation: Participation) {
    const conversation = this.snapshot.find(item => item.id === participation.conversationId);

    if (conversation) {
      conversation.participations = conversation.participations.map(relation => {
        return relation.id === participation.id ? participation : relation;
      });

      this.updateFromSnapshot();
    }
  }
}