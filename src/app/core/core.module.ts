import { ErrorHandler, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';
import { SocketApiService } from './socket-api.service';
import { RestApiService } from './rest-api.service';
import { Paginator } from './paginator.service';
import { AuthService } from './auth/auth.service';
import { TokenService } from './auth/token.service';
import { UserResolver } from './auth/user-resolver.service';
import { UserService } from './auth/user.service';
import { ErrorHandlerService } from './error-handler.service';
import { SidebarService } from './sidebar.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http, options);
}

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    RestApiService,
    SocketApiService,
    Paginator,
    AuthService,
    TokenService,
    UserResolver,
    UserService,
    SidebarService
  ]
})
export class CoreModule {}