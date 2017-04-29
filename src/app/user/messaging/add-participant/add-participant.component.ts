import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { UserListService } from '../shared/user-list.service';
import { ActiveConversationService } from '../shared/active-conversation.service';
import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../shared/conversation.model';
import { User } from '../../../core/user.model';

@Component({
  providers: [UserListService],
  templateUrl: 'add-participant.component.html'
})
export class AddParticipantComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The selected conversation.
   */
  conversation: Conversation;

  /**
   * List of loaded users.
   */
  users: User[];

  /**
   * The current cursor of the paginated users.
   */
  cursor = new BehaviorSubject(30);

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private activeConversationService: ActiveConversationService,
              private conversationService: ConversationService,
              private userList: UserListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeConversationService.conversation,
      this.userList.users
    ).subscribe(data => {
      [this.conversation, this.users] = data;
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
   * Adds a participant to the conversation.
   */
  addParticipant(user: User) {
    this.conversationService.addParticipant(this.conversation.id, user);
  }
}
