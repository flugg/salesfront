import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Injectable()
export class MessageListService extends ObservableResourceList implements OnDestroy {

  /**
   * The number of resources to fetch when paginating.
   */
  protected limit = 30;

  /**
   * The observable list of messages.
   */
  readonly messages: Observable<Message[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private messageService: MessageService) {
    super();

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