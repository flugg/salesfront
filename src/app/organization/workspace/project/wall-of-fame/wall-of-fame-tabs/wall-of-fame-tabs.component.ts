import { Component, OnInit } from '@angular/core';
import { TopDailySellersListService } from './user-list/top-daily-sellers-list.service';

@Component({
  providers: [TopDailySellersListService],
  selector: 'vmo-wall-of-fame-tabs',
  templateUrl: 'wall-of-fame-tabs.component.html'
})
export class WallOfFameTabsComponent implements OnInit {

  /**
   * Constructs the component.
   */
  constructor() {}

  /**
   * Initializes the component.
   */
  ngOnInit() {}
}
