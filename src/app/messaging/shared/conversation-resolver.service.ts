import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ConversationService } from './conversation.service';
import { Conversation } from '../../core/models/conversation.model';


@Injectable()
export class ConversationResolver implements Resolve<Conversation> {

  /**
   * Constructs the route resolver.
   */
  constructor(private conversationService: ConversationService) {}

  /**
   * Resolves data.
   */
  resolve(): Observable<Conversation> {
    return this.conversationService.findWithUpdates(this.route.snapshot.params['id']).subscribe(conversation => {
      this.conversation = conversation;
    })
  }
}