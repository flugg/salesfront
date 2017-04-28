import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ConversationService } from './conversation.service';
import { Conversation } from '../../core/models/conversation.model';
import { Message } from '../../core/models/message.model';
import { Participation } from '../../core/models/participation.model';
import { SocketApiService } from '../../core/socket-api.service';

@Injectable()
export class ActiveConversationService implements OnDestroy {

  /**
   * A snapshot of the last conversation.
   */
  private snapshot: Conversation;

  /**
   * The active conversation subject.
   */
  private conversation: ReplaySubject<Conversation> = new ReplaySubject(1);

  /**
   * Constructs the service.
   */
  constructor(private conversationService: ConversationService,
              private sockets: SocketApiService,
              private route: ActivatedRoute) {
    this.conversationService.find(this.route.snapshot.params.id).subscribe(conversation => {
      this.snapshot = conversation;
      this.conversation.next(conversation);
    });

    this.sockets.listenForUserr({
      'message_sent': (message) => this.setLastMessage(message),
      'participant_added': (participation) => this.addParticipant(participation),
      'participant_removed': (participation) => this.setParticipant(participation),
    }, this);
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.conversation.unsubscribe();
    this.sockets.stopListening(this);
  }

  /**
   * Fetch the active conversation.
   */
  get(): Observable<Conversation> {
    return this.conversation.asObservable();
  }

  /**
   * Sets the active conversation.
   */
  private set(conversation: Conversation) {
    this.conversation.next(conversation);
  }

  /**
   * Sets the last message on the conversation.
   */
  private setLastMessage(message: Message) {
    this.snapshot.lastMessage = message;
    this.snapshot.lastMessageId = message.id;

    this.set(this.snapshot);
  }

  /**
   * Adds a participant to the conversation.
   */
  private addParticipant(participation: Participation) {
    this.snapshot.participations.push(participation);
    this.set(this.snapshot);
  }

  /**
   * Sets a participant on the conversation.
   */
  private setParticipant(participation: Participation) {
    this.snapshot.participations = this.snapshot.participations.map(relation => {
      return relation.id === participation.id ? participation : relation;
    });

    this.set(this.snapshot);
  }
}