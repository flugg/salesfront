import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    SharedModule,
    FeedRoutingModule
  ],
  declarations: [
    FeedComponent,
    PostComponent
  ],
  providers: [
    PostService,
    CommentService
  ]
})
export class FeedModule {}
