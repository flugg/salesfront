import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Conversation } from '../../core/models/conversation.model';
import { RestApiService } from '../../core/rest-api.service';
import { SocketApiService } from '../../core/socket-api.service';
import { ResourceListSubject } from '../../core/utils/subjects/resource-list-subject';

@Injectable()
export class MessageService {

  /**
   * Construct the service.
   */
  constructor(private api: RestApiService, private sockets: SocketApiService) {}

  /**
   * Fetch a list of the conversation's messages.
   */
  get(conversationId: string, cursor: BehaviorSubject<number>): ResourceListSubject<Conversation[]> {
    const subject = new ResourceListSubject([]);

    cursor.subscribe(limit => {
      this.api.paginate(`conversations/${conversationId}/messages`, subject.nextCursor(), limit).subscribe(response => {
        subject.setCursor(response.cursor);
        subject.addMany(response.data);

        if (!subject.nextCursor()) {
          cursor.complete();
        }
      });
    });

    return subject;
  }

  /**
   * Fetch an updating stream of the conversation's messages.
   */
  getWithUpdates(conversationId: string, cursor: BehaviorSubject<number>): ResourceListSubject<Conversation[]> {
    const subject = this.get(conversationId, cursor);

    this.onMessagePosted(message => {
      subject.add(message);
    });

    return subject;
  }

  /**
   * Start a new conversation.
   */
  send(conversation: Conversation, body: string): Promise<Conversation> {
    return this.api.post(`conversations/${conversation.id}/messages`, {
      message: body,
    });
  }

  /**
   * Registers a listener for new message posted in conversation.
   */
  onMessagePosted(callback: Function): MessageService {
    this.sockets.listenForUser('1', 'message_sent', message => callback(message));
    return this;
  }
}
