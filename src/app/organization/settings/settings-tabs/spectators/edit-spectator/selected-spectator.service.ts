import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../../../../../core/observable-resource';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { MemberService } from '../../../../../core/services/member.service';
import { Member } from '../../../../../core/models/member.model';

@Injectable()
export class SelectedSpectatorService extends ObservableResource implements OnDestroy {
  readonly spectator: Observable<Member> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private memberService: MemberService) {
    super();

    this.memberService.findSpectator(this.route.snapshot.params['spectator']).subscribe(spectator => {
      this.set(spectator);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}