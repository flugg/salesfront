import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { Conversation } from '../models/conversation.model';
import { Participation } from '../models/participation.model';
import { Member } from '../models/member.model';

@Injectable()
export class ConversationService {
  constructor(private api: RestApiService) {}

  get(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/conversations`, cursor, limit);
  }

  find(id: string): Observable<Conversation> {
    return this.api.get(`conversations/${id}`).map(response => response.data);
  }

  start(organizationId: string, participants: Member[]): Promise<Conversation> {
    return this.api.post(`organizations/${organizationId}/conversations`, {
      participants: participants.map(participant => participant.id)
    }).then(response => response.data);
  }

  markAsRead(participation: Participation): Promise<Conversation> {
    return this.api.put(`participations/${participation.id}`);
  }

  addParticipant(conversationId: string, participant: Member): Promise<Conversation> {
    return this.api.post(`conversations/${conversationId}/participations`, {
      participant: participant.id
    });
  }

  removeParticipant(participation: Participation): Promise<Conversation> {
    return this.api.delete(`participations/${participation.id}`);
  }

  isLocked(conversation: Conversation, member: Member): boolean {
    return conversation.participations.find(item => item.memberId === member.id).leftAt != null;
  }
}