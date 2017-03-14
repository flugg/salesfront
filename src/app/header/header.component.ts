import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private items: string[][];
  private currentUser: string;

  /**
   * Construct the component.
   */
  constructor(private auth: AuthService) { }

  /**
   * Initialize the component.
   */
  ngOnInit() {
    this.currentUser = 'Lao Tzu';

    this.items = [];
    this.items.push(['Feed', '/feed']);
    this.items.push(['ScoreBoard', '/scoreboard']);
    this.items.push(['Budget', '/budget']);
    this.items.push(['Teams', '/teams']);
    this.items.push(['Users', '/users']);
    this.items.push(['Sales', '/sales']);
    this.items.push(['Settings', '/settings']);
  }

}
