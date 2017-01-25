import { NgModule } from '@angular/core';

import { FeedComponent } from './feed.component';
import { FeedRoutingModule} from './feed-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        FeedComponent
    ],
    imports: [
        SharedModule,
        FeedRoutingModule
    ]
})
export class FeedModule {}
