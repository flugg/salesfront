import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../../../core/observable-resource';
import { SocketApiService } from '../../../core/socket-api.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { Conversation } from '../../../core/models/conversation.model';
import { Message } from '../../../core/models/message.model';
import { Participation } from '../../../core/models/participation.model';

@Injectable()
export class ActiveConversationService extends ObservableResource implements OnDestroy {
  readonly conversation: Observable<Conversation> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private conversationService: ConversationService) {
    super();

    this.conversationService.find(this.route.snapshot.params['conversation']).subscribe(conversation => this.set(conversation));

    this.sockets.listenForConversation(this.route.snapshot.params['conversation'], {
      'message_sent': message => this.setLastMessage(message),
      'participant_added': participation => this.addParticipant(participation),
      'participant_removed': participation => this.setParticipant(participation)
    }, this);
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private setLastMessage(message: Message) {
    this.snapshot.lastMessage = message;
    this.snapshot.lastMessageId = message.id;
    this.updateFromSnapshot();
  }

  private addParticipant(participation: Participation) {
    this.snapshot.participations.push(participation);
    this.updateFromSnapshot();
  }

  private setParticipant(participation: Participation) {
    this.snapshot.participations = this.snapshot.participations.map(relation => {
      return relation.id === participation.id ? participation : relation;
    });

    this.updateFromSnapshot();
  }
}