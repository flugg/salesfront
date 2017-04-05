import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { PostService } from './post.service';

@NgModule({
  imports: [
    SharedModule,
    FeedRoutingModule,
  ],
  declarations: [
    FeedComponent,
  ],
  providers: [
    PostService,
  ],
})
export class FeedModule {}
