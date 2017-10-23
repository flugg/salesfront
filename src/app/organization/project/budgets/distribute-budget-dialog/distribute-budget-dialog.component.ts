import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import * as moment from 'moment';

import { Team } from '../../../../core/models/team.model';
import { BudgetService } from '../../../../core/services/budget.service';
import { AddBudgetComponent } from '../add-budget/add-budget.component';

@Component({
  templateUrl: 'distribute-budget-dialog.component.html'
})
export class DistributeBudgetDialogComponent implements OnInit {
  pending = false;

  onDistribute = new EventEmitter();

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<AddBudgetComponent>) {}

  ngOnInit(): void {
  }

  calculatedTotal(): number {
    return this.data.teams.filter(team => team.enabled).reduce((total, team) => total + this.calculatedTotalForTeam(team), 0);
  }

  calculatedTotalForTeam(team: Team): number {
    return team.members.filter(member => member.enabled).reduce((teamTotal, member) => teamTotal + member.value, 0);
  }

  submit() {
    this.pending = true;

    this.dialog.close();
    this.onDistribute.emit(this.data.teams);
  }
}
