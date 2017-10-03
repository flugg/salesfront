import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Message } from '../../../core/models/message.model';
import { ObservableResourceList } from '../../../core/observable-resource-list';
import { MessageService } from '../../../core/services/message.service';
import { SocketApiService } from '../../../core/socket-api.service';

@Injectable()
export class MessageListService extends ObservableResourceList implements OnDestroy {
  protected limit = 30;
  readonly messages: Observable<Message[]> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private messageService: MessageService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.cursor = null;
      this.snapshot = [];
      this.sockets.stopListening(this);

      this.paginator.subscribe(limit => {
        this.pagination(this.messageService.get(this.route.snapshot.params['conversation'], limit, this.cursor))
          .subscribe(messages => this.add(messages));
      });

      this.sockets.listenForConversation(this.route.snapshot.params['conversation'], {
        'message_sent': (message) => this.addMessage(message)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addMessage(message: Message) {
    if (message.conversationId === this.route.snapshot.params['conversation']) {
      this.snapshot.unshift(message);
      this.updateFromSnapshot();
    }
  }
}