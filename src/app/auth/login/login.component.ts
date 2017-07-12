import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  /**
   * The email input value.
   */
  email: string;

  /**
   * The password input value.
   */
  password: string;

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private auth: AuthService,
              private snackbar: MdSnackBar) {}

  /**
   * Attempts to log the user in and navigate into the application.
   */
  submit(email, password) {
    this.auth.attempt(email, password).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/projects']);
      } else {
        this.snackbar.open('Invalid credentials given', null, <MdSnackBarConfig>{ duration: 3000 });
      }
    });
  }
}