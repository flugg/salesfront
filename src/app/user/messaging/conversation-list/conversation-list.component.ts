import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { ActiveUserService } from '../../../core/auth/active-user.service';
import { ConversationListService } from '../shared/conversation-list.service';
import { Conversation } from '../shared/conversation.model';
import { User } from '../../../core/user.model';

@Component({
  providers: [ConversationListService],
  templateUrl: 'conversation-list.component.html'
})
export class ConversationListComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * The loaded conversations.
   */
  conversations: Conversation[];

  /**
   * Constructs the component.
   */
  constructor(public conversationList: ConversationListService,
              private activeUser: ActiveUserService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    Observable.combineLatest(
      this.activeUser.user,
      this.conversationList.conversations
    ).subscribe(data => {
      [this.user, this.conversations] = data;
      this.loading = false;
    });
  }

  /**
   * Checks if there are unread messages in the given conversation for the given user.
   */
  hasUnreadMessages(conversation: Conversation): boolean {
    const participation = conversation.participations.find(item => item.userId === this.user.id);

    if (participation.lastReadMessage && conversation.lastMessage) {
      return participation.lastReadMessage.id !== conversation.lastMessage.id;
    }

    return false;
  }
}
