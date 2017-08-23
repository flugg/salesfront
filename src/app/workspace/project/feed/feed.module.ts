import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { PostService } from '../../../core/services/post.service';
import { CommentService } from '../../../core/services/comment.service';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    FeedRoutingModule
  ],
  declarations: [
    PostListComponent,
    PostComponent
  ],
  providers: [
    PostService,
    CommentService
  ]
})
export class FeedModule {}
