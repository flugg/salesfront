import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ConversationService } from './conversation.service';
import { Conversation } from '../../core/models/conversation.model';
import { Message } from '../../core/models/message.model';
import { Participation } from '../../core/models/participation.model';
import { SocketApiService } from '../../core/socket-api.service';
import { MessageService } from './message.service';
import { BehaviorSubject } from 'rxjs';
import { RestApiService } from '../../core/rest-api.service';
import { PaginatedList } from '../../core/paginated-list';

@Injectable()
export class MessageListService extends PaginatedList implements OnDestroy {

  /**
   * A snapshot of the list of messages.
   */
  private snapshot: Message[] = [];

  /**
   * The message list subject.
   */
  private messages: ReplaySubject<Message[]> = new ReplaySubject(1);

  /**
   * Constructs the service.
   */
  constructor(private messageService: MessageService,
              private sockets: SocketApiService,
              private route: ActivatedRoute) {
    super(30);

    this.paginator.subscribe(limit => {
      this.messageService.get(this.route.snapshot.params.id, limit, this.cursor).subscribe(response => {
        this.snapshot.push(...response.data);
        this.set(this.snapshot);
        this.setCursor(response.cursor);
      });
    });

    this.paginate();

    this.sockets.listenForUserr({
      message_sent: (message) => this.addMessage(message),
    }, this);
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.messages.unsubscribe();
    this.sockets.stopListening(this);
  }

  /**
   * Fetch the message list.
   */
  get(): Observable<Message[]> {
    return this.messages.asObservable();
  }

  /**
   * Sets the list of messages.
   */
  private set(messages: Message[]) {
    this.messages.next(messages);
  }

  /**
   * Sets the last message on the conversation.
   */
  private addMessage(message: Message) {
    if (message.conversationId === this.route.snapshot.params.id) {
      this.snapshot.unshift(message);
      this.set(this.snapshot);
    }
  }
}