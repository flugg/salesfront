import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { OrganizationService } from './core/services/organization.service';
import { ActiveUserGuard } from './organization-list/active-user-guard.service';
import { ActiveUserService } from './organization-list/active-user.service';
import { OrganizationGuard } from './organization-list/organization-guard.service';
import { OrganizationListComponent } from './organization-list/organization-list.component';

import { SharedModule } from './shared/shared.module';

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
    OrganizationGuard,
    ActiveUserService,
    ActiveUserGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
