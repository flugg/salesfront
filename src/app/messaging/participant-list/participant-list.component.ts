import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ConversationService } from '../shared/conversation.service';
import { Conversation } from '../../core/models/conversation.model';
import { Participation } from '../../core/models/participation.model';

@Component({
  selector: 'sf-participant-list',
  templateUrl: './participant-list.component.html',
})
export class ParticipantListComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The selected conversation.
   */
  conversation: Observable<Conversation>;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private conversationService: ConversationService,
              private route: ActivatedRoute) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.conversation = this.conversationService.findWithUpdates(this.route.snapshot.parent.params['id']);

    this.conversation.subscribe(() => this.isLoading = false);
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
  }
}
