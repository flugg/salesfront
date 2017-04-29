import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ErrorsModule } from './errors/errors.module';
import { AppComponent } from './app.component';
import { OrganizationComponent } from './organization/organization.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ErrorsModule
  ],
  declarations: [
    AppComponent,
    OrganizationComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
