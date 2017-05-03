import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { ActiveConversationService } from '../shared/active-conversation.service';
import { UserListService } from '../shared/user-list.service';
import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../shared/conversation.model';
import { User } from '../../../core/user.model';

@Component({
  providers: [UserListService],
  templateUrl: 'add-participant.component.html'
})
export class AddParticipantComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected conversation.
   */
  conversation: Conversation;

  /**
   * List of loaded users.
   */
  users: User[];

  /**
   * Constructs the component.
   */
  constructor(public userList: UserListService,
              private activeConversation: ActiveConversationService,
              private conversationService: ConversationService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    Observable.combineLatest(
      this.activeConversation.conversation,
      this.userList.users
    ).subscribe(data => {
      [this.conversation, this.users] = data;
      this.loading = false;
    });
  }

  /**
   * Adds a participant to the conversation.
   */
  addParticipant(user: User) {
    this.conversationService.addParticipant(this.conversation.id, user);
  }
}
