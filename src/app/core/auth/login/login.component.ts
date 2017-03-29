import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'sf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit(email, psw) {
    this.auth.attempt(email, psw);
  }

}

export class query {
  constructor(public email, public psw) {
  }
}