import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'invite-user.component.html'
})
export class InviteUserComponent implements OnInit {

  /**
   * Constructs the component.
   */
  constructor() {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    //
  }

  /**
   * Submits the form to invite a user.
   */
  submit(email: string) {
    console.log(email);
  }
}
