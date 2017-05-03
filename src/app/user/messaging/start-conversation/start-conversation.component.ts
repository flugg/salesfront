import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { ActiveUserService } from '../../../core/auth/active-user.service';
import { UserListService } from '../shared/user-list.service';
import { ConversationService } from '../shared/conversation.service';
import { MessageService } from '../shared/message.service';
import { User } from '../../../core/user.model';

@Component({
  providers: [UserListService],
  templateUrl: 'start-conversation.component.html'
})
export class StartConversationComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * List of loaded users.
   */
  users: User[];

  /**
   * List of selected participants.
   */
  participants: User[] = [];

  /**
   * Constructs the component.
   */
  constructor(public userList: UserListService,
              private router: Router,
              private activeUser: ActiveUserService,
              private conversationService: ConversationService,
              private messageService: MessageService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    Observable.combineLatest(
      this.activeUser.user,
      this.userList.users
    ).subscribe(data => {
      [this.user, this.users] = data;
      this.loading = false;
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
