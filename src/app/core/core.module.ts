import { ErrorHandler, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { ProjectService } from './project.service';
import { RestApiService } from './http/rest-api.service';
import { SidebarService } from './sidebar/sidebar.service';
import { SocketApiService } from './sockets/socket-api.service';
import { TokenService } from './auth/token.service';
import { UserService } from './user.service';
import { SidebarResolver } from './sidebar/sidebar-resolver.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({ tokenName: 'token' }), http, options);
}

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions] },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    AuthService,
    ProjectService,
    RestApiService,
    SidebarService,
    SidebarResolver,
    SocketApiService,
    TokenService,
    UserService
  ]
})
export class CoreModule {
}