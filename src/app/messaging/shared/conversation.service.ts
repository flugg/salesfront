import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RestApiService } from '../../core/rest-api.service';
import { SocketApiService } from '../../core/socket-api.service';
import { Conversation } from '../../core/models/conversation.model';
import { User } from '../../core/models/user.model';
import { ResourceListSubject } from '../../core/utils/subjects/resource-list-subject';
import { Participation } from '../../core/models/participation.model';
import { ResourceSubject } from '../../core/utils/subjects/resource-subject';

@Injectable()
export class ConversationService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService,
              private sockets: SocketApiService) {}

  /**
   * Fetch a list of the user's conversations.
   */
  get(cursor: BehaviorSubject<number>): ResourceListSubject<Conversation[]> {
    const subject = new ResourceListSubject([]);

    cursor.subscribe(limit => {
      this.api.paginate('conversations', subject.nextCursor(), limit).subscribe(response => {
        subject.setCursor(response.cursor);
        subject.appendMany(response.data);

        if (!subject.nextCursor()) {
          cursor.complete();
        }
      });
    });

    return subject;
  }

  /**
   * Fetch an updating stream of the user's conversations.
   */
  getWithUpdates(cursor: BehaviorSubject<number>): ResourceListSubject<Conversation[]> {
    const subject = this.get(cursor);

    this.onStarted(conversation => {
      subject.append(conversation);
    }).onLastMessageUpdated(message => {
      subject.set('lastMessage', message, message.conversationId);
    }).onParticipantAdded(participation => {
      subject.addRelated('participations', participation, participation.conversationId);
    }).onParticipantRemoved(participation => {
      subject.setRelated('participations', participation, participation.conversationId, participation.id);
    });

    return subject;
  }

  /**
   * Fetch a conversation by id.
   */
  find(id: string): ResourceSubject<Conversation> {
    const subject = new ResourceSubject({});

    this.api.get(`conversations/${id}`).map(response => response.data).subscribe(conversation => {
      subject.next(conversation);
    });

    return subject;
  }

  /**
   * Fetch an updating stream of a single conversation by id.
   */
  findWithUpdates(id: string): ResourceSubject<Conversation> {
    const subject = this.find(id);

    this.onLastMessageUpdated(message => {
      subject.set('lastMessage', message);
    }).onParticipantAdded(participation => {
      subject.addRelated('participations', participation);
    }).onParticipantRemoved(participation => {
      subject.setRelated('participations', participation, participation.id);
    });

    return subject;
  }

  /**
   * Start a new conversation.
   */
  start(participants: User[]): Promise<Conversation> {
    return this.api.post('conversations', {
      participants: participants.map(participant => participant.id),
    });
  }

  /**
   * Start a new conversation.
   */
  addParticipant(conversation: Conversation, participant: User): Promise<Conversation> {
    return this.api.post(`conversations/${conversation.id}/participations`, {
      participant: participant.id,
    });
  }

  /**
   * Start a new conversation.
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