import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { UserListService } from '../shared/user-list.service';
import { ConversationService } from '../shared/conversation.service';
import { MessageService } from '../shared/message.service';
import { User } from '../../../core/user.model';

@Component({
  providers: [UserListService],
  templateUrl: 'start-conversation.component.html'
})
export class StartConversationComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The currently logged in user.
   */
  currentUser: User;

  /**
   * List of loaded users.
   */
  users: User[];

  /**
   * List of selected participants.
   */
  participants: User[] = [];

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userList: UserListService,
              private conversationService: ConversationService,
              private messageService: MessageService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.currentUser = this.route.snapshot.parent.parent.data['currentUser'];

    this.subscriptions.push(this.userList.users.subscribe(users => {
      this.users = users;
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
   * Adds a participant to the selection list.
   */
  addParticipant(user: User): void {
    if (!this.participants.includes(user)) {
      this.participants.push(user);
    }
  }

  /**
   * Removes a participant from the selection list.
   */
  removeParticipant(user: User): void {
    this.participants.splice(this.participants.indexOf(user), 1);
  }

  /**
   * Starts a conversation and sends the first message.
   */
  start(message: string): void {
    this.conversationService.start(this.participants).then(conversation => {
      this.messageService.send(conversation.id, message).then(() => {
        this.router.navigate(['messages', conversation.id]);
      });
    });
  }
}
