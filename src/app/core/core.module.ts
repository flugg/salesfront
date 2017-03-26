import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavItemComponent } from './sidebar/nav-item/nav-item.component';
import { AuthService } from './auth/auth.service';
import { SocketApiService } from './socket-api.service';
import { RestApiService } from './rest-api.service';
import { SharedModule } from '../shared/shared.module';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
    NavItemComponent,
  ],
  declarations: [
    LoginComponent,
    SidebarComponent,
    NavItemComponent,
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions],
    },
    AuthService,
    RestApiService,
    SocketApiService,
  ],
})
export class CoreModule {}