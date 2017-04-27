import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/rest-api.service';
import { Message } from '../../core/models/message.model';

@Injectable()
export class MessageService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService) {}

  /**
   * Fetch a list of the conversation's messages.
   */
  get(conversationId: string, limit: number, cursor?: string): Observable<any> {
    return this.api.paginate(`conversations/${conversationId}/messages`, cursor, limit, {include: 'user'});
  }

  /**
   * Start a new conversation.
   */
  send(conversationId: string, body: string): Promise<Message> {
    return this.api.post(`conversations/${conversationId}/messages`, {
      message: body
    }).then(response => response.data);
  }
}
