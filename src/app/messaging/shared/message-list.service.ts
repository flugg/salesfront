import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MessageService } from './message.service';
import { SocketApiService } from '../../core/socket-api.service';
import { PaginatedList } from '../../core/paginated-list';
import { Message } from '../../core/models/message.model';

@Injectable()
export class MessageListService extends PaginatedList implements OnDestroy {

  /**
   * The observable list of messages.
   */
  readonly messages: Observable<Message[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private messageService: MessageService,
              private sockets: SocketApiService,
              private route: ActivatedRoute) {
    super(30);

    this.paginator.subscribe(limit => {
      this.pagination(this.messageService.get(this.route.snapshot.params.id, limit, this.cursor))
        .subscribe(messages => this.add(messages));
    });

    this.sockets.listenForUser({
      'message_sent': (message) => this.addMessage(message)
    }, this);
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  /**
   * Sets the last message on the conversation.
   */
  private addMessage(message: Message) {
    if (message.conversationId === this.route.snapshot.params.id) {
      this.snapshot.unshift(message);
      this.updateFromSnapshot();
    }
  }
}