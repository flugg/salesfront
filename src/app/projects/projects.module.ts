import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ScoreboardModule } from "./scoreboard/scoreboard.module";
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { FeedModule } from "./feed/feed.module";
import { TeamsComponent } from './teams/teams.component';
import { BudgetComponent } from './budget/budget.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectslistComponent,
    TeamsComponent,
    BudgetComponent,
    UsersComponent,
    SettingsComponent
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    ScoreboardModule,
    FeedModule
  ]
})

export class ProjectsModule {}
