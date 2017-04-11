import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from '../../core/rest-api.service';
import { SocketApiService } from '../../core/socket-api.service';
import { Paginator } from '../../core/paginator.service';
import { Conversation } from '../../core/models/conversation.model';
import { Message } from '../../core/models/message.model';

@Injectable()
export class MessageService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService,
              private sockets: SocketApiService,
              private paginator: Paginator) {
  }

  /**
   * Fetch a list of the conversation's messages.
   */
  get(conversationId: string, cursor: BehaviorSubject<number>): Observable<Message[]> {
    const messages = this.paginator.paginate(`conversations/${conversationId}/messages`, cursor, {
      include: 'user'
    });

    return messages.asObservable();
  }

  /**
   * Fetch an updating stream of the conversation's messages.
   */
  getWithUpdates(conversationId: string, cursor: BehaviorSubject<number>): Observable<Message[]> {
    const messages = this.paginator.paginate(`conversations/${conversationId}/messages`, cursor, {
      include: 'user'
    });

    this.onMessagePosted(message => {
      if (message.conversationId === conversationId) {
        messages.prepend(message);
      }
    });

    return messages.asObservable();
  }

  /**
   * Start a new conversation.
   */
  send(conversationId: string, body: string): Promise<Conversation> {
    return this.api.post(`conversations/${conversationId}/messages`, {
      message: body
    }, { include: 'user' }).then(response => response.data);
  }

  /**
   * Registers a listener for new messages posted in the conversation.
   */
  onMessagePosted(callback: Function): MessageService {
    this.sockets.listenForUser('message_sent', message => callback(message));
    return this;
  }
}
