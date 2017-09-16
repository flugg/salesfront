import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'settings-tabs.component.html'
})
export class SettingsTabsComponent implements OnInit {
  loading = false;

  ngOnInit(): void {
    this.loading = true;
  }
}
