import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../../core/models/conversation.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sf-conversations',
  templateUrl: 'conversation-list.component.html',
})
export class ConversationListComponent implements OnInit {

  /**
   * List of loaded conversations.
   */
  private conversations: Conversation[];

  /**
   * The current cursor of the paginated conversations.
   */
  private conversationCursor: BehaviorSubject<number>;

  /**
   * Constructs the component.
   */
  constructor(private conversationService: ConversationService,
              private route: ActivatedRoute) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.conversationCursor = new BehaviorSubject(10);
    this.conversationService.getWithUpdates(this.conversationCursor).subscribe(conversations => {
      this.conversations = conversations;
    });
  }

  /**
   * Load more conversations.
   */
  loadMore() {
    this.conversationCursor.next(10);
  }

  /**
   * Check if all conversations has been loaded.
   */
  hasLoadedAll() {
    return this.conversationCursor.isStopped;
  }
}
