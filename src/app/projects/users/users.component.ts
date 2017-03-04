import { Component, OnInit } from '@angular/core';
import { UserService } from "../../user/user.service";


@Component({
  selector: 'sf-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users;

  constructor(private usrService: UserService) { }

  ngOnInit() {
    this.usrService.find('project/id').subscribe(users => this.users = users);
  }
}
