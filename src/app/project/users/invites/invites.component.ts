import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProjectService } from '../../project.service';
import { InviteService } from './invite.service';

@Component({
  selector: 'vmo-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded users.
   */
  invites: User[];

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * The cursor for the paginated users.
   */
  cursor = new BehaviorSubject(15);


  constructor(private inviteService: InviteService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.subscriptions.push(this.inviteService.getWithUpdates(this.projectService.savedProject(), this.cursor).subscribe(invites => {
      this.invites = invites;
      this.isLoading = false;
    }));
  }
}
