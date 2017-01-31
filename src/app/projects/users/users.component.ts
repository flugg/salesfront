import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { User } from "./user";

@Component({
  selector: 'sf-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: User[];

  constructor(private usrService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(){
    this.usrService.getUsers().then(users => this.users = users);
  }

}
