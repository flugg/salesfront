import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../core/auth/user.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vmo-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  /**
   * Weather or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The user being shown
   */
  user: User;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.userService.findWithUpdates(this.route.snapshot.url[0].path).subscribe(user => {
      this.user = user;
      this.isLoading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
