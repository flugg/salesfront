import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'sf-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  /**
   * Constructs the component.
   */
  constructor(private auth: AuthService,
              private router: Router) {}

  /**
   * Attempts to log the user in.
   */
  submit(email, password) {
    this.auth.attempt(email, password).subscribe(() => {
      this.router.navigate(['/projects', '1']);
    });
  }
}