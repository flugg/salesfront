import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ActiveConversationService } from '../shared/active-conversation.service';
import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../shared/conversation.model';
import { Participation } from '../shared/participation.model';
import { User } from '../../../core/user.model';

@Component({
  templateUrl: 'participant-list.component.html'
})
export class ParticipantListComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The currently logged in user.
   */
  currentUser: User;

  /**
   * The selected conversation.
   */
  conversation: Conversation;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private activeConversationService: ActiveConversationService,
              private conversationService: ConversationService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.currentUser = this.route.snapshot.parent.parent.parent.data['currentUser'];

    this.subscriptions.push(this.activeConversationService.conversation.subscribe(conversation => {
      this.conversation = conversation;
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
   * Removes a participation from the conversation.
   */
  removeParticipant(participation: Participation) {
    this.conversationService.removeParticipant(participation);

    if (participation.userId === this.currentUser.id) {
      this.router.navigate(['messages', this.conversation.id]);
    }
  }
}
