import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/auth/user.service';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'vmo-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of loaded users.
   */
  users: User[];

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * The cursor for the paginated users.
   */
  cursor = new BehaviorSubject(15);


  constructor(private userService: UserService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.subscriptions.push(this.userService.getWithUpdates(this.projectService.savedProject(), this.cursor).subscribe(users => {
      this.users = users;
      this.isLoading = false;
      console.log(users);
    }));
    console.log(this.users);
  }

}
