import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService {
  constructor(private api: RestApiService) {}

  find(messageId: string): Observable<Message> {
    return this.api.get(`messages/${messageId}/`, { include: 'member.user,conversation' }).map(response => response.data);
  }

  get(conversationId: string, limit: number, cursor?: string): Observable<any> {
    return this.api.paginate(`conversations/${conversationId}/messages`, cursor, limit);
  }

  send(conversationId: string, body: string): Promise<Message> {
    return this.api.post(`conversations/${conversationId}/messages`, {
      message: body
    }).then(response => response.data);
  }
}
