import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../../../core/sockets/observable-resource';
import { SocketApiService } from '../../../core/sockets/socket-api.service';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.model';
import { Message } from './message.model';
import { Participation } from './participation.model';

@Injectable()
export class ActiveConversationService extends ObservableResource implements OnDestroy {

  /**
   * The observable active conversation.
   */
  readonly conversation: Observable<Conversation> = this.subject.asObservable();

  /**
   * Constructs the service.
   */
  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private conversationService: ConversationService) {
    super();

    this.conversationService.find(this.route.snapshot.params.id).subscribe(conversation => this.set(conversation));

    this.sockets.listenForUser({
      'message_sent': (message) => this.setLastMessage(message),
      'participant_added': (participation) => this.addParticipant(participation),
      'participant_removed': (participation) => this.setParticipant(participation)
    }, this);
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  /**
   * Sets the last message on the conversation.
   */
  private setLastMessage(message: Message) {
    this.snapshot.lastMessage = message;
    this.snapshot.lastMessageId = message.id;
    this.updateFromSnapshot();
  }

  /**
   * Adds a participant to the conversation.
   */
  private addParticipant(participation: Participation) {
    this.snapshot.participations.push(participation);
    this.updateFromSnapshot();
  }

  /**
   * Sets a participant on the conversation.
   */
  private setParticipant(participation: Participation) {
    this.snapshot.participations = this.snapshot.participations.map(relation => {
      return relation.id === participation.id ? participation : relation;
    });

    this.updateFromSnapshot();
  }
}