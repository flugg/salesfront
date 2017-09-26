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
import { TeamMember } from '../../core/models/team-member.model';
import { MdSidenav } from '@angular/material';

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
  @Input() sidenav: MdSidenav;

  loading = true;
  teamMembers: TeamMember[];
  unreadConversations: Conversation[];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private auth: AuthService,
              private unreadConversationListService: UnreadConversationListService) {}

  ngOnInit() {
    this.loading = false;
    this.teamMembers = this.membership.teamMembers.filter(teamMember => {
      return teamMember.team.projectId === this.project.id;
    });
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

  goBackToOrganization() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.onClose.subscribe(() => this.router.navigate([this.membership.organizationId]));
      this.sidenav.close();
    } else {
      this.router.navigate([this.membership.organizationId]);
    }
  }
}
