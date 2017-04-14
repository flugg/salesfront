import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    children: [
      {
        path: ':id',
        loadChildren: '../project/project.module#ProjectModule' // 'src/app/accounts/project/project.module#ProjectModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountsRoutingModule { }
