import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { slideIn } from '../../core/animations/slide-in';
import { Member } from '../../core/models/member.model';
import { Project } from '../../core/models/project.model';
import { Team } from '../../core/models/team.model';

@Component({
  selector: 'vmo-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.scss'],
  animations: [slideIn()]
})
export class LeaderboardComponent implements OnInit {
  @Input() project: Project;
  @Input() items: Member[] | Team[];
  @Input() type = 'users';
  @Input() avatar = true;

  loading = true;
  count = 10;
  countComplete = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.count = Math.min(this.count, this.items.length);
    setTimeout(() => this.loading = false, 1);
  }

  onClickBar(item: Member | Team): void {
    if (this.type === 'teams') {
      this.router.navigate([this.project.organizationId, 'projects', this.project.id, 'leaderboard', 'teams', item.id]);
    }
  }

  calculateWidth(item: Member | Team): string {
    if (this.items[0].value) {
      return item.value * 100 / this.items[0].value + '%';
    }

    return '';
  }

  loadAll(): void {
    this.count = this.items.length;
  }
}
