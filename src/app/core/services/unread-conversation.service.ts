import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { Conversation } from '../models/conversation.model';

@Injectable()
export class UnreadConversationService {
  constructor(private api: RestApiService) {}

  list(organizationId: string): Observable<Conversation[]> {
    return this.api.get(`organizations/${organizationId}/unread-conversations`).map(response => response.data);
  }
}