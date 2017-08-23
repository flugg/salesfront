import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { fadeInOut } from '../../core/animations/fade-in-out';
import { AuthService } from '../../core/auth/auth.service';
import { UnreadConversationListService } from './unread-conversation-list.service';
import { Conversation } from '../../core/models/conversation.model';
import { Project } from '../../core/models/project.model';
import { Member } from '../../core/models/member.model';

@Component({
  selector: 'vmo-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  providers: [UnreadConversationListService],
  animations: [fadeInOut()]
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Input() project: Project;
  @Input() membership: Member;

  unreadConversations: Conversation[];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private auth: AuthService,
              private unreadConversationListService: UnreadConversationListService) {}

  ngOnInit() {
    this.unreadConversationListService.conversations.subscribe(conversations => {
      this.unreadConversations = conversations;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
