import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/rest-api.service';
import { Conversation } from '../../core/models/conversation.model';
import { Participation } from '../../core/models/participation.model';
import { User } from '../../core/models/user.model';

@Injectable()
export class ConversationService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetch a list of the user's conversations.
   */
  get(limit: number, cursor?: string): Observable<any> {
    return this.api.paginate('conversations', cursor, limit);
  }

  /**
   * Fetch a conversation by id.
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