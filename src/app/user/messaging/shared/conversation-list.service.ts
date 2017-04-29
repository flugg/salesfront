import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.model';
import { Participation } from './participation.model';
import { Message } from './message.model';

@Injectable()
export class ConversationListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of conversations.
   */
  readonly conversations: Observable<Conversation[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private conversationService: ConversationService) {
    super();

    this.paginator.subscribe(limit => {
      this.pagination(this.conversationService.get(limit, this.cursor))
        .subscribe(conversations => this.add(conversations));
    });

    this.sockets.listenForUser({
      'conversation_started': (conversation) => this.addConversation(conversation),
      'message_sent': (message) => this.setLastMessage(message),
      'last_message_read': (participation) => this.setParticipant(participation),
      'participant_added': (participation) => this.addParticipant(participation),
      'participant_removed': (participation) => this.setParticipant(participation)
    }, this);
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  /**
   * Adds a conversation to the list.
   */
  private addConversation(conversation: Conversation) {
    this.snapshot.unshift(conversation);
    this.updateFromSnapshot();
  }

  /**
   * Sets the last message of the corresponding conversation.
   */
  private setLastMessage(message: Message) {
    const conversation = this.snapshot.find(item => item.id === message.conversationId);
    conversation.lastMessage = message;
    conversation.lastMessageId = message.id;
    this.moveToFront(conversation);
  }

  /**
   * Moves the conversation to the front of the list.
   */
  private moveToFront(conversation: Conversation) {
    this.snapshot = this.snapshot.filter(item => item.id !== conversation.id);
    this.snapshot.unshift(conversation);
    this.updateFromSnapshot();
  }

  /**
   * Adds a participant to the corresponding conversation.
   */
  private addParticipant(participation: Participation) {
    this.snapshot.find(item => item.id === participation.conversationId).participations.push(participation);
    this.updateFromSnapshot();
  }

  /**
   * Sets a participant on the corresponding conversation.
   */
  private setParticipant(participation: Participation) {
    const conversaton = this.snapshot.find(item => item.id === participation.conversationId);
    conversaton.participations = conversaton.participations.map(relation => {
      return relation.id === participation.id ? participation : relation;
    });

    this.updateFromSnapshot();
  }
}