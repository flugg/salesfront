import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Conversation } from '../../core/models/conversation.model';
import { User } from '../../core/models/user.model';
import { ConversationListService } from '../shared/conversation-list.service';

@Component({
  providers: [
    ConversationListService
  ],
  templateUrl: 'conversation-list.component.html'
})
export class ConversationListComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The currently logged in user.
   */
  currentUser: User;

  /**
   * List of loaded conversations.
   */
  conversations: Conversation[];

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public conversationListService: ConversationListService,
              private route: ActivatedRoute) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.currentUser = this.route.snapshot.parent.data['currentUser'];

    this.subscriptions.push(this.conversationListService.conversations.subscribe(conversations => {
      this.conversations = conversations;
      this.isLoading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  /**
   * Checks if there are any unread messages in the given conversation.
   */
  hasUnread(conversation: Conversation): boolean {
    const participation = conversation.participations.find(item => item.userId === this.currentUser.id);

    if (participation.lastReadMessage && conversation.lastMessage) {
      return participation.lastReadMessage.id !== conversation.lastMessage.id;
    }

    return false;
  }
}
