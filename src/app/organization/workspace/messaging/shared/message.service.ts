import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../../../core/http/rest-api.service';
import { Message } from './message.model';

@Injectable()
export class MessageService {

  /**
   * Constructs the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetches a list of messages in a conversation.
   */
  get(conversationId: string, limit: number, cursor?: string): Observable<any> {
    return this.api.paginate(`conversations/${conversationId}/messages`, cursor, limit);
  }

  /**
   * Sends a message in a conversation.
   */
  send(conversationId: string, body: string): Promise<Message> {
    return this.api.post(`conversations/${conversationId}/messages`, {
      message: body
    }).then(response => response.data);
  }
}
