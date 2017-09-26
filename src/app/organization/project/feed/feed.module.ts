import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrganizationSharedModule } from '../../shared/organization-shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    FeedRoutingModule
  ],
  declarations: [
    PostListComponent,
    PostComponent
  ]
})
export class FeedModule {}
