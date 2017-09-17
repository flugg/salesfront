import { ErrorHandler, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { RestApiService } from './rest-api.service';
import { SocketApiService } from './socket-api.service';
import { TokenService } from './auth/token.service';
import { ScreenService } from './screen.service';
import { AvatarService } from './services/avatar.service';
import { CommentService } from './services/comment.service';
import { ConversationService } from './services/conversation.service';
import { DailyAwardService } from './services/daily-award.service';
import { InviteService } from './services/invite.service';
import { LeaderboardService } from './services/leaderboard.service';
import { MemberService } from './services/member.service';
import { MembershipService } from './services/membership.service';
import { MessageService } from './services/message.service';
import { MonthlyAwardService } from './services/monthly-award.service';
import { OrganizationService } from './services/organization.service';
import { PostService } from './services/post.service';
import { ProjectService } from './services/project.service';
import { SaleService } from './services/sale.service';
import { SessionService } from './services/session.service';
import { TeamService } from './services/team.service';
import { TeamMemberService } from './services/team-member.service';
import { UnreadConversationService } from './services/unread-conversation.service';
import { UserService } from './services/user.service';
import { StorageService } from './storage.service';
import { WeeklyAwardService } from './services/weekly-award.service';
import { YearlyAwardService } from './services/yearly-award.service';
import { ContractService } from './services/contract.service';
import { ContractFieldService } from './services/contract-field.service';
import { ContractTemplateService } from './services/contract-template.service';
import { ReportService } from './services/report.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions, tokenService: TokenService) {
  return new AuthHttp(new AuthConfig({ tokenName: 'token', tokenGetter: () => tokenService.get() }), http, options);
}

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions, TokenService] },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    AuthService,
    StorageService,
    TokenService,
    RestApiService,
    SocketApiService,
    ScreenService,
    AvatarService,
    CommentService,
    ConversationService,
    ContractService,
    ContractFieldService,
    ContractTemplateService,
    DailyAwardService,
    InviteService,
    LeaderboardService,
    MemberService,
    MembershipService,
    MessageService,
    MonthlyAwardService,
    OrganizationService,
    PostService,
    ProjectService,
    ReportService,
    SaleService,
    SessionService,
    TeamService,
    TeamMemberService,
    UnreadConversationService,
    UserService,
    WeeklyAwardService,
    YearlyAwardService
  ]
})
export class CoreModule {
}