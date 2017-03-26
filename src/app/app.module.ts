import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
// import { MessagingModule } from './messaging/messaging.module';
// import { ProjectsModule } from './projects/projects.module';
// import { UsersModule } from './users/users.module';
import { ErrorsModule } from './errors/errors.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ErrorsModule,
    // MessagingModule,
    // ProjectsModule,
    // UsersModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
