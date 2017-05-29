import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'invite-user.component.html',
  styleUrls: ['invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * Indicates if you want to stay on the invite user page.
   */
  inviteMore = false;

  /**
   * Constructs the component.
   */
  constructor() {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.loading = false;
  }

  /**
   * Submits the form to invite a user.
   */
  submit(email: string) {

  }
}
