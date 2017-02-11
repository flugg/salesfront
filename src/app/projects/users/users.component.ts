import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { User } from "./user";
import { Observable } from "rxjs";

@Component({
  selector: 'sf-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users;

  constructor(private usrService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(){
    this.usrService.getUsers().subscribe( users => this.users = users);
  }

}
