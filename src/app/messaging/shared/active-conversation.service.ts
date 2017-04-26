import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { ConversationService } from './conversation.service';
import { Conversation } from '../../core/models/conversation.model';

@Injectable()
export class ActiveConversationService {

  /**
   * The active conversation subject.
   */
  private conversation: ReplaySubject<Conversation> = new ReplaySubject(1);

  /**
   * Constructs the service.
   */
  constructor(private conversationService: ConversationService,
              private route: ActivatedRoute) {
    this.conversationService.findWithUpdates(this.route.snapshot.params.id).subscribe(conversation => {
      this.conversation.next(conversation);
    });
  }

  /**
   * Fetch the active conversation.
   */
  get(): Observable<Conversation> {
    return this.conversation.asObservable();
  }
}