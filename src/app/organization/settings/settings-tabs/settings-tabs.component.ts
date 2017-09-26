import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'settings-tabs.component.html'
})
export class SettingsTabsComponent implements OnInit {
  loading = true;

  ngOnInit(): void {
    this.loading = false;
  }
}
