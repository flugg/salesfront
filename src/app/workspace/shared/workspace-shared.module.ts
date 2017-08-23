import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../../shared/shared.module';
import { SaleService } from '../../core/services/sale.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    LeaderboardComponent
  ],
  declarations: [
    ToolbarComponent,
    LeaderboardComponent
  ],
  providers: [
    SaleService
  ]
})
export class WorkspaceSharedModule {}