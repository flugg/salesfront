import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {
  @Input() text: string;
  @Input() uri: string;

  /**
   * Construct the component.
   */
  constructor() { }

  /**
   * Initialize the component.
   */
  ngOnInit() { }
}
