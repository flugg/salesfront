import { Component, OnInit } from '@angular/core';

import { Conversation } from '../../core/models/conversation.model';
import { ConversationService } from '../shared/conversation.service';
import { ActivatedRoute } from '@angular/router';
import { Participation } from '../../core/models/participation.model';

@Component({
  selector: 'sf-participant-list',
  templateUrl: './participant-list.component.html',
})
export class ParticipantListComponent implements OnInit {

  /**
   * The selected conversation.
   */
  private conversation: Conversation;

  /**
   * Constructs the component.
   */
  constructor(private conversationService: ConversationService, private route: ActivatedRoute) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.conversationService.findWithUpdates(this.route.snapshot.params['id']).subscribe(conversation => {
      this.conversation = conversation;
    });
  }

  /**
   * Removes a given participation from the conversation.
   */
  removeParticipant(participation: Participation) {
    this.conversationService.removeParticipant(participation);
  }
}
