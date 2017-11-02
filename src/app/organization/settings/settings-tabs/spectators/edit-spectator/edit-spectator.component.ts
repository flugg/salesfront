import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig, MdDialog, MdDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Member } from '../../../../../core/models/member.model';
import { Project } from '../../../../../core/models/project.model';
import { ScreenService } from '../../../../../core/screen.service';
import { MemberService } from '../../../../../core/services/member.service';
import { UserService } from '../../../../../core/services/user.service';
import { ProjectListService } from '../../../../project-list.service';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SelectedSpectatorService } from './selected-spectator.service';

@Component({
  templateUrl: 'edit-spectator.component.html',
  styleUrls: ['edit-spectator.component.scss'],
  providers: [ProjectListService, SelectedSpectatorService]
})
export class EditSpectatorComponent implements OnInit, OnDestroy {
  membership: Member;
  projects: Project[];
  firstName: string;
  lastName: string;
  email: string;
  newPassword: string;
  loading = true;
  pending = false;
  columns = 2;
  gutter = 24;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private dialog: MdDialog,
              private screenService: ScreenService,
              private userService: UserService,
              private memberService: MemberService,
              private selectedSpectatorService: SelectedSpectatorService,
              private projectListService: ProjectListService) {}

  ngOnInit() {
    this.loading = false;

    this.subscriptions.push(Observable.combineLatest(
      this.selectedSpectatorService.spectator,
      this.projectListService.projects
    ).subscribe(data => {
      [this.membership, this.projects] = data;
      this.firstName = this.membership.user.firstName;
      this.lastName = this.membership.user.lastName;
      this.email = this.membership.user.email;
      this.membership.spectatingProjects.forEach(spectatingProject => {
        this.projects.find(project => project.id === spectatingProject.id).enabled = true;
      });
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

  submit() {
    this.pending = true;
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };

    if (this.newPassword) {
      user['password'] = this.newPassword;
    }

    this.userService.update(this.membership.userId, user).then(() => {
      const projects = this.projects.filter(project => project.enabled).map(project => project.id);
      this.memberService.update(this.membership.id, { projects: projects }).then(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
        this.snackBar.open('User updated', null, <MdSnackBarConfig>{ duration: 2000 });
        this.pending = false;
      });
    });
  }

  removeSpectator() {
    const dialog = this.dialog.open(DeleteConfirmationComponent, <MdDialogConfig>{
      data: {
        membership: this.membership
      }
    });

    dialog.componentInstance.onDeleted.subscribe(() => {
      dialog.afterClosed().subscribe(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
    });
  }
}
