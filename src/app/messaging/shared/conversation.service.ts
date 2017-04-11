import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/rest-api.service';
import { SocketApiService } from '../../core/socket-api.service';
import { Paginator } from '../../core/paginator.service';
import { ResourceSubject } from '../../core/utils/subjects/resource-subject';
import { Conversation } from '../../core/models/conversation.model';
import { Participation } from '../../core/models/participation.model';
import { User } from '../../core/models/user.model';

@Injectable()
export class ConversationService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService,
              private sockets: SocketApiService,
              private paginator: Paginator) {
  }

  /**
   * Fetch a list of the user's conversations.
   */
  get(cursor: BehaviorSubject<number>): Observable<Conversation[]> {
    const conversations = this.paginator.paginate('conversations', cursor);

    return conversations.asObservable();
  }

  /**
   * Fetch an updating stream of the user's conversations.
   */
  getWithUpdates(cursor: BehaviorSubject<number>): Observable<Conversation[]> {
    const conversations = this.paginator.paginate('conversations', cursor);

    this.onStarted(conversation => {
      conversations.prepend(conversation);
    }).onLastMessageUpdated(message => {
      conversations.moveToFront(message.conversationId);
      conversations.set(message.conversationId, 'lastMessage', message);
    }).onLastMessageRead(participation => {
      conversations.setRelated(participation.conversationId, 'participations', participation.id, participation);
    }).onParticipantRemoved(participation => {
      conversations.setRelated(participation.conversationId, 'participations', participation.id, participation);
    }).onParticipantAdded(participation => {
      if (conversations.has(participation.conversationId)) {
        conversations.addRelated(participation.conversationId, 'participations', participation);
      } else {
        this.find(participation.conversationId).subscribe(conversation => conversations.prepend(conversation));
      }
    });

    return conversations.asObservable();
  }

  /**
   * Fetch a conversation by id.
   */
  find(id: string): Observable<Conversation> {
    return this.api.get(`conversations/${id}`).map(response => response.data);
  }

  /**
   * Fetch an updating stream of a single conversation by id.
   */
  findWithUpdates(id: string): Observable<Conversation> {
    const conversation = new ResourceSubject(null);

    this.find(id).subscribe(data => {
      conversation.next(data);
    });

    this.onLastMessageUpdated(message => {
      conversation.set('lastMessage', message);
    }).onParticipantAdded(participation => {
      conversation.addRelated('participations', participation);
    }).onParticipantRemoved(participation => {
      conversation.setRelated('participations', participation.id, participation);
    });

    return conversation.asObservable();
  }

  /**
   * Starts a new conversation.
   */
  start(participants: User[]): Promise<Conversation> {
    return this.api.post('conversations', {
      participants: participants.map(participant => participant.id)
    }).then(response => response.data);
  }

  /**
   * Marks last message in a conversation as read.
   */
  markAsRead(participation: Participation): Promise<Conversation> {
    return this.api.put(`participations/${participation.id}`);
  }

  /**
   * Indicates if the given conversation is locked for given user.
   */
  isLocked(conversation: Conversation, user: User): boolean {
    return conversation.participations.find(item => item.userId === user.id).leftAt != null;
  }

  /**
   * Adds a participant to a conversation.
   */
  addParticipant(conversationId: string, participant: User): Promise<Conversation> {
    return this.api.post(`conversations/${conversationId}/participations`, {
      participant: participant.id
    });
  }

  /**
   * Removes a participant from a conversation.
   */
  removeParticipant(participation: Participation): Promise<Conversation> {
    return this.api.delete(`participations/${participation.id}`);
  }

  /**
   * Registers a listener for new conversations.
   */
  onStarted(callback: Function): ConversationService {
    this.sockets.listenForUser('conversation_started', conversation => callback(conversation));
    return this;
  }

  /**
   * Registers a listener for new message added to conversation.
   */
  onLastMessageUpdated(callback: Function): ConversationService {
    this.sockets.listenForUser('message_sent', message => callback(message));
    return this;
  }

  /**
   * Registers a listener for when last message in a conversation has been read.
   */
  onLastMessageRead(callback: Function): ConversationService {
    this.sockets.listenForUser('last_message_read', message => callback(message));
    return this;
  }

  /**
   * Registers a listener for new participants.
   */
  onParticipantAdded(callback: Function): ConversationService {
    this.sockets.listenForUser('participant_added', message => callback(message));
    return this;
  }

  /**
   * Registers a listener for leaving participants.
   */
  onParticipantRemoved(callback: Function): ConversationService {
    this.sockets.listenForUser('participant_removed', message => callback(message));
    return this;
  }
}