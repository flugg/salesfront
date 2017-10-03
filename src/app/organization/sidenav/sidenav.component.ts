import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Router } from '@angular/router';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/first';
import { Subscription } from 'rxjs/Subscription';

import { fadeInOut } from '../../core/animations/fade-in-out';
import { AuthService } from '../../core/auth/auth.service';
import { Conversation } from '../../core/models/conversation.model';
import { Member } from '../../core/models/member.model';
import { UnreadConversationListService } from './unread-conversation-list.service';
import { Project } from '../../core/models/project.model';
import { UrlService } from '../../core/url.service';

@Component({
  selector: 'vmo-organization-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  providers: [UnreadConversationListService],
  animations: [fadeInOut()]
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Input() membership: Member;
  @Input() project: Project;
  @Input() sidenav: MdSidenav;

  unreadConversations: Conversation[];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private auth: AuthService,
              private unreadConversationListService: UnreadConversationListService,
              private urlService: UrlService) {}

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

  goToOrganization() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.onClose.first().subscribe(() => {
        this.router.navigate([this.membership.organizationId]);
      });
      this.sidenav.close();
    } else {
      this.router.navigate([this.membership.organizationId]);
    }
  }

  goToProfile() {
    this.urlService.overwrite = true;
    this.router.navigate(['/', this.membership.organizationId, 'users', this.membership.id]);
  }
}
