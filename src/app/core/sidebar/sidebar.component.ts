import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'vo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  private currentUser: string;

  /**
   * Construct the component.
   */
  constructor(private auth: AuthService) {}

  /**
   * Initialize the component.
   */
  ngOnInit() {
    this.currentUser = 'Lao Tzu';
  }

}
