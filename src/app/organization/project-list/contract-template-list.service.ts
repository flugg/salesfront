import { Injectable, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ObservableResourceList } from '../../core/observable-resource-list';
import { ContractTemplate } from '../../core/models/contract-template.model';
import { ActiveMembershipService } from '../active-membership.service';
import { ContractTemplateService } from '../../core/services/contract-template.service';
import { SocketApiService } from '../../core/socket-api.service';

@Injectable()
export class ContractTemplateListService extends ObservableResourceList implements OnDestroy {
  readonly templates: Observable<ContractTemplate[]> = this.subject.asObservable();
  protected paginator: BehaviorSubject<number> = new BehaviorSubject(this.limit);

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private contractTemplateService: ContractTemplateService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.cursor = null;
      this.snapshot = [];
      this.sockets.stopListening(this);

      this.activeMembershipService.membership.subscribe(membership => {
        this.contractTemplateService.list(membership.organizationId).subscribe(templates => this.set(templates));

        this.sockets.listenForOrganization(membership.organizationId, {
          'contract_template_registered': template => this.add([template]),
        }, this);
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}
