import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { ConversationService } from '../../../../core/services/conversation.service';
import { MessageService } from '../../../../core/services/message.service';
import { UserProfileComponent } from '../user-profile.component';

@Component({
  templateUrl: 'send-message-dialog.component.html'
})
export class SendMessageDialogComponent implements OnInit {
  loading = true;
  pending = false;
  message = '';

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<UserProfileComponent>,
              private router: Router,
              private conversationService: ConversationService,
              private messageService: MessageService) {}

  ngOnInit() {}

  sendMessage() {
    this.pending = true;
    this.conversationService.start(this.data.organizationId, this.data.participants).then(conversation => {
      this.messageService.send(conversation.id, this.message).then(() => {
        this.dialog.close();
        this.router.navigate([this.data.organization.slug, 'messages', conversation.id]);
      });
    });
  }
}
