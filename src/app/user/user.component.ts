import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";

@Component({
  selector: 'sf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  getNew(){
    this.service.find('42').subscribe(d => console.log(d.toString));
  }

}
