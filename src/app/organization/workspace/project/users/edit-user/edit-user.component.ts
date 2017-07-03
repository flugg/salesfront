import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../../shared/user.service';
import { User } from '../../../../shared/user.model';

@Component({
  templateUrl: 'edit-user.component.html',
  styleUrls: ['edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected user.
   */
  user: User;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.userService.find(this.route.snapshot.parent.params.member).subscribe(user => {
      this.user = user;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Submits the form.
   */
  submit(firstName: string, lastName: string, email: string, phoneNumber: string): void {
    this.userService.update(this.user.id, {firstName, lastName, email, phoneNumber}).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}