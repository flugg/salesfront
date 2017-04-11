import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../../core/models/conversation.model';
import { Participation } from '../../core/models/participation.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'vmo-participant-list',
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
  constructor(private conversationService: ConversationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.currentUser = this.route.snapshot.parent.parent.parent.data['currentUser'];

    this.subscriptions.push(this.conversationService.findWithUpdates(this.route.snapshot.parent.params['id']).subscribe(conversation => {
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
