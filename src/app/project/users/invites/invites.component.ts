import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProjectService } from '../../project.service';
import { InviteService } from './invite.service';
import { Invite } from '../../../core/models/invite.model';
import { ActiveProjectService } from '../../../core/active-project.service';

@Component({
  selector: 'vmo-invites',
  templateUrl: './invites.component.html',
})
export class InvitesComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded users.
   */
  invites: Invite[];

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * The cursor for the paginated users.
   */
  cursor = new BehaviorSubject(15);


  constructor(private inviteService: InviteService,
              private activeProject: ActiveProjectService) { }

  ngOnInit() {
    this.subscriptions.push(this.inviteService.getWithUpdates(this.activeProject.get(), this.cursor).subscribe(invites => {
      this.invites = invites;
      this.isLoading = false;
    }));
  }
}
