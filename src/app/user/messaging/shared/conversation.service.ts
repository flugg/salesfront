import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../core/http/rest-api.service';
import { PaginationResponse } from '../../../core/http/pagination-response';
import { Conversation } from './conversation.model';
import { Participation } from './participation.model';
import { User } from '../../../core/user.model';

@Injectable()
export class ConversationService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of conversations.
   */
  get(limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate('conversations', cursor, limit);
  }

  /**
   * Fetches a single conversation by id.
   */
  find(id: string): Observable<Conversation> {
    return this.api.get(`conversations/${id}`).map(response => response.data);
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
   * Indicates if the given conversation is locked for given user.
   */
  isLocked(conversation: Conversation, user: User): boolean {
    return conversation.participations.find(item => item.userId === user.id).leftAt != null;
  }
}