import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { ConversationService } from '../shared/conversation.service';
import { UserService } from '../../core/auth/user.service';
import { Conversation } from '../../core/models/conversation.model';
import { User } from '../../core/models/user.model';
import { ActiveConversationService } from '../shared/active-conversation.service';

@Component({
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
              private userService: UserService) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeConversationService.get(),
      this.userService.getAllWithUpdates(this.cursor)
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
