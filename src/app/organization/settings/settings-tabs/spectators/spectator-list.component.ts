import { Component, OnInit } from '@angular/core';

import { SpectatorListService } from './spectator-list.service';
import { Member } from '../../../../core/models/member.model';

@Component({
  templateUrl: 'spectator-list.component.html',
  providers: [SpectatorListService]
})
export class SpectatorListComponent implements OnInit {
  loading = true;
  spectators: Member[] = [];

  constructor(public spectatorListService: SpectatorListService) {}

  ngOnInit() {
    this.spectatorListService.spectators.subscribe(spectators => {
      this.spectators = spectators;
      this.loading = false;
    });
  }
}
