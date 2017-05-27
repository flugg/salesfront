import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'invite-user.component.html',
  styleUrls: ['invite-user.component.scss']
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
