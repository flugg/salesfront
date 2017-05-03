import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { ActiveConversationService } from '../shared/active-conversation.service';
import { ActiveUserService } from '../../../core/auth/active-user.service';
import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../shared/conversation.model';
import { Participation } from '../shared/participation.model';
import { User } from '../../../core/user.model';

@Component({
  templateUrl: 'participant-list.component.html'
})
export class ParticipantListComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The currently logged in user.
   */
  user: User;

  /**
   * The selected conversation.
   */
  conversation: Conversation;

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private activeUser: ActiveUserService,
              private activeConversation: ActiveConversationService,
              private conversationService: ConversationService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    Observable.combineLatest(
      this.activeUser.user,
      this.activeConversation.conversation
    ).subscribe(data => {
      [this.user, this.conversation] = data;
      this.loading = false;
    });
  }

  /**
   * Removes a participation from the conversation.
   */
  removeParticipant(participation: Participation) {
    this.conversationService.removeParticipant(participation);

    if (participation.userId === this.user.id) {
      this.router.navigate(['messages', this.conversation.id]);
    }
  }
}
