import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Member } from '../../../../../core/models/member.model';
import { Project } from '../../../../../core/models/project.model';
import { ScreenService } from '../../../../../core/screen.service';
import { InviteService } from '../../../../../core/services/invite.service';
import { MemberService } from '../../../../../core/services/member.service';
import { UserService } from '../../../../../core/services/user.service';
import { ActiveMembershipService } from '../../../../active-membership.service';
import { ProjectListService } from '../../../../project-list.service';

@Component({
  templateUrl: 'invite-spectator.component.html',
  styleUrls: ['invite-spectator.component.scss'],
  providers: [ProjectListService]
})
export class InviteSpectatorComponent implements OnInit, OnDestroy {
  membership: Member;
  projects: Project[];
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading = true;
  pending = false;
  inviteMore = false;
  columns = 2;
  gutter = 24;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private screenService: ScreenService,
              private inviteService: InviteService,
              private userService: UserService,
              private memberService: MemberService,
              private activeMembershipService: ActiveMembershipService,
              private projectListService: ProjectListService) {}

  ngOnInit() {
    this.loading = false;

    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.projectListService.projects
    ).subscribe(data => {
      [this.membership, this.projects] = data;
      this.loading = false;
    }));

    this.subscriptions.push(this.screenService.asObservable().subscribe(breakpoint => {
      if (breakpoint === 'xs') {
        this.columns = 1;
      } else {
        this.columns = 2;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  submit(form) {
    this.pending = true;
    this.inviteService.sendInvite(this.membership.organizationId, this.email).then(invite => {
      this.userService.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        isAdmin: false
      }).then(user => {
        this.memberService.createSpectator(invite.id, user.id, this.projects.filter(project => project.enabled)).then(() => {
          if (!this.inviteMore) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }

          form.reset();
          this.pending = false;
          this.snackBar.open('Spectator invited', null, <MdSnackBarConfig>{ duration: 2000 });
        });
      });
    });
  }
}
