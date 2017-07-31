import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { ObservableResourceList } from '../../../core/sockets/observable-resource-list';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { UnreadConversationService } from '../../shared/unread-conversation.service';
import { Conversation } from '../messaging/shared/conversation.model';

@Injectable()
export class UnreadConversationListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of conversations.
   */
  readonly conversations: Observable<Conversation[]> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private sockets: SocketApiService,
              private unreadConversationService: UnreadConversationService) {
    super();

    this.paginator.subscribe(limit => {
      this.unreadConversationService.get().subscribe(conversations => this.set(conversations));
    });
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}