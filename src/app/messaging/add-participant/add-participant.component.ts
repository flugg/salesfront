import { Component, OnInit } from '@angular/core';

import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../../core/models/conversation.model';
import { User } from '../../core/models/user.model';
import { UserService } from '../../user/user.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'sf-add-participant',
  templateUrl: './add-participant.component.html',
})
export class AddParticipantComponent implements OnInit {

  /**
   * The selected conversation.
   */
  private conversation: Conversation;

  /**
   * List of loaded users.
   */
  private users: User[];

  /**
   * The current cursor of the paginated users.
   */
  private userCursor: BehaviorSubject<number>;

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
    console.log(this.route.parent.parent.parent.parent);
    this.route.root.data.subscribe(data => {
      console.log('data');
      console.log(data);
    });
    this.conversationService.findWithUpdates(this.route.snapshot.parent.parent.params['id']).subscribe(conversation => {
      this.conversation = conversation;
    });

    this.userCursor = new BehaviorSubject(2);
    this.userService.getWithUpdates(this.userCursor).subscribe(users => {
      this.users = users;
    });
  }

  /**
   * Load more users.
   */
  loadMore() {
    this.userCursor.next(30);
  }

  /**
   * Check if all users has been loaded.
   */
  hasLoadedAll() {
    return this.userCursor.isStopped;
  }

  /**
   * Adds a participant to the conversation.
   */
  addParticipant(user: User) {
    this.conversationService.addParticipant(this.conversation, user);
  }
}
