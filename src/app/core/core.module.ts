import { ErrorHandler, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';
import { ActiveProjectService } from './auth/active-project.service';
import { AuthService } from './auth/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { RestApiService } from './http/rest-api.service';
import { SidebarService } from './sidebar.service';
import { SocketApiService } from './sockets/socket-api.service';
import { TokenService } from './auth/token.service';
import { UserResolver } from './auth/user-resolver.service';
import { UserService } from './user.service';

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
    ActiveProjectService,
    AuthService,
    RestApiService,
    SidebarService,
    SocketApiService,
    TokenService,
    UserResolver,
    UserService
  ]
})
export class CoreModule {}