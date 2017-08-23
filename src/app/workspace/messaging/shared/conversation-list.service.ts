import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../core/observable-resource-list';
import { SocketApiService } from '../../../core/socket-api.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { ActiveMembershipService } from '../../../organization/active-membership.service';
import { Conversation } from '../../../core/models/conversation.model';
import { Participation } from '../../../core/models/participation.model';
import { Message } from '../../../core/models/message.model';

@Injectable()
export class ConversationListService extends ObservableResourceList implements OnDestroy {
  readonly conversations: Observable<Conversation[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private conversationService: ConversationService) {
    super();

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
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addConversation(conversation: Conversation) {
    this.snapshot.unshift(conversation);
    this.updateFromSnapshot();
  }

  private setLastMessage(message: Message) {
    const conversation = this.snapshot.find(item => item.id === message.conversationId);
    conversation.lastMessage = message;
    conversation.lastMessageId = message.id;
    this.moveToFront(conversation);
  }

  private moveToFront(conversation: Conversation) {
    this.snapshot = this.snapshot.filter(item => item.id !== conversation.id);
    this.snapshot.unshift(conversation);
    this.updateFromSnapshot();
  }

  private addParticipant(participation: Participation) {
    this.snapshot.find(item => item.id === participation.conversationId).participations.push(participation);
    this.updateFromSnapshot();
  }

  private setParticipant(participation: Participation) {
    const conversaton = this.snapshot.find(item => item.id === participation.conversationId);
    conversaton.participations = conversaton.participations.map(relation => {
      return relation.id === participation.id ? participation : relation;
    });

    this.updateFromSnapshot();
  }
}