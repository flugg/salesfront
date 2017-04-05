import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { ConversationService } from '../shared/conversation.service';
import { MessageService } from '../shared/message.service';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/auth/user.service';

@Component({
  selector: 'sf-start-conversation',
  templateUrl: './start-conversation.component.html',
})
export class StartConversationComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The current message.
   */
  message: string;

  /**
   * The currently logged in user.
   */
  currentUser: User;

  /**
   * List of loaded users.
   */
  users: Observable<User[]>;

  /**
   * List of selected participants.
   */
  participants: User[] = [];

  /**
   * The current cursor of the paginated users.
   */
  private cursor = new BehaviorSubject(30);

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
              private router: Router) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.currentUser = this.route.snapshot.parent.parent.data['currentUser'];
    this.users = this.userService.getWithUpdates(this.cursor);

    this.subscriptions.push(this.users.subscribe(() => this.isLoading = false));
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
   * Load more users.
   */
  loadMore() {
    this.cursor.next(30);
  }

  /**
   * Check if all users has been loaded.
   */
  hasLoadedAll() {
    return this.cursor.isStopped;
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
  start(): void {
    this.conversationService.start(this.participants).then(conversation => {
      this.messageService.send(conversation.id, this.message).then(() => {
        this.router.navigate(['messages', conversation.id]);
      });
    });
  }
}
