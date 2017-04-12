import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { ConversationService } from '../shared/conversation.service';
import { MessageService } from '../shared/message.service';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/auth/user.service';

@Component({
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
  constructor(private conversationService: ConversationService,
              private messageService: MessageService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.currentUser = this.route.snapshot.parent.parent.data['currentUser'];

    this.subscriptions.push(this.userService.getWithUpdates(this.cursor).subscribe(users => {
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
