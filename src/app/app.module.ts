import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrganizationService } from './core/services/organization.service';
import { OrganizationListComponent } from './organization-list/organization-list.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    OrganizationListComponent
  ],
  providers: [
    OrganizationService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
