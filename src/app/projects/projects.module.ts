import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ScoreboardModule } from "./scoreboard/scoreboard.module";
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { FeedModule } from "./feed/feed.module";
import { UsersModule } from "./users/users.module";
import { TeamsModule } from "./teams/teams.module";
import { BudgetModule } from "./budget/budget.module";
import { SalesModule } from "./sales/sales.module";
import { SettingsModule } from "./settings/settings.module";


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectslistComponent,
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    ScoreboardModule,
    SettingsModule,
    FeedModule,
    UsersModule,
    TeamsModule,
    BudgetModule,
    SalesModule,
  ]
})

export class ProjectsModule {}
