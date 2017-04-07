import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/zip';

import { ConversationService } from '../shared/conversation.service';
import { UserService } from '../../core/auth/user.service';
import { Conversation } from '../../core/models/conversation.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'vmo-add-participant',
  templateUrl: './add-participant.component.html',
})
export class AddParticipantComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The selected conversation.
   */
  conversation: Observable<Conversation>;

  /**
   * List of loaded users.
   */
  users: Observable<User[]>;

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
              private userService: UserService,
              private route: ActivatedRoute) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.conversation = this.conversationService.findWithUpdates(this.route.snapshot.parent.parent.params['id']);
    this.users = this.userService.getWithUpdates(this.cursor);

    this.subscriptions.push(Observable.zip(this.conversation, this.users).subscribe(() => {
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
   * Adds a participant to the conversation.
   */
  addParticipant(user: User) {
    this.conversationService.addParticipant(this.route.snapshot.parent.parent.params['id'], user);
  }
}
