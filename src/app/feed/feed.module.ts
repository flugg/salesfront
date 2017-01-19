import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeedComponent } from './feed.component';
import { feedRoutes } from './feed.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        FeedComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(feedRoutes)
    ]
})
export class FeedModule {}