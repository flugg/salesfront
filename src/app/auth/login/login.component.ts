import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private auth: AuthService) {}

  /**
   * Attempts to log the user in and navigate into the application.
   */
  submit(email, password) {
    this.auth.attempt(email, password).subscribe(() => {
      this.router.navigate(['projects']);
    });
  }
}