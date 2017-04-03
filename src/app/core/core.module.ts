import { ErrorHandler, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavItemComponent } from './sidebar/nav-item/nav-item.component';
import { SocketApiService } from './socket-api.service';
import { RestApiService } from './rest-api.service';
import { Paginator } from './paginator.service';
import { AuthService } from './auth/auth.service';
import { TokenService } from './auth/token.service';
import { UserResolver } from './auth/user-resolver.service';
import { ErrorHandlerService } from './error-handler.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
  }), http, options);
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
  ],
})
export class CoreModule {}