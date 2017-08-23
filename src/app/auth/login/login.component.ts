import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private router: Router,
              private snackbar: MdSnackBar,
              private auth: AuthService) {}

  submit() {
    this.auth.attempt(this.email, this.password).subscribe(() => {
      this.router.navigate(['/']);
    }, () => this.snackbar.open('Invalid credentials given', null, <MdSnackBarConfig>{ duration: 3000 }));
  }
}