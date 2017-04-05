import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ErrorsModule } from './errors/errors.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ErrorsModule,
  ],
  declarations: [
    AppComponent,
    ProjectListComponent
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
