import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { ActiveConversationService } from '../shared/active-conversation.service';
import { UserListService } from '../shared/user-list.service';
import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../shared/conversation.model';
import { User } from '../../../shared/user.model';

@Component({
  providers: [UserListService],
  templateUrl: 'add-participant.component.html'
})
export class AddParticipantComponent implements OnInit, OnDestroy {

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
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

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
    this.subscriptions.push(Observable.combineLatest(
      this.activeConversation.conversation,
      this.userList.users
    ).subscribe(data => {
      [this.conversation, this.users] = data;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Adds a participant to the conversation.
   */
  addParticipant(user: User) {
    this.conversationService.addParticipant(this.conversation.id, user);
  }
}
