import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../../core/http/rest-api.service';
import { Conversation } from '../workspace/messaging/shared/conversation.model';

@Injectable()
export class UnreadConversationService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of unread conversations.
   */
  get(): Observable<Conversation[]> {
    return this.api.get('unread-conversations').map(response => response.data);
  }
}