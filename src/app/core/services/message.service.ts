import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../rest-api.service';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService {
  constructor(private api: RestApiService) {}

  get(conversationId: string, limit: number, cursor?: string): Observable<any> {
    return this.api.paginate(`conversations/${conversationId}/messages`, cursor, limit);
  }

  send(conversationId: string, body: string): Promise<Message> {
    return this.api.post(`conversations/${conversationId}/messages`, {
      message: body
    }).then(response => response.data);
  }
}
