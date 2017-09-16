import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContractTemplate } from '../../../../../core/models/contract-template.model';

import { ObservableResourceList } from '../../../../../core/observable-resource-list';
import { ContractTemplateService } from '../../../../../core/services/contract-template.service';
import { SocketApiService } from '../../../../../core/socket-api.service';
import { ActiveMembershipService } from '../../../../../organization/active-membership.service';

@Injectable()
export class TemplateListService extends ObservableResourceList implements OnDestroy {
  readonly templates: Observable<ContractTemplate[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private contractTemplateService: ContractTemplateService) {
    super();

    this.activeMembershipService.membership.first().subscribe(membership => {
      this.paginator.subscribe(limit => {
        this.pagination(this.contractTemplateService.get(membership.organizationId, limit, this.cursor))
          .subscribe(members => this.add(members));
      });

      this.sockets.listenForOrganization(membership.organizationId, {
        'contract_template_registered': template => this.addTemplate(template),
        'contract_template_updated': template => this.updateTemplate(template)
      }, this);
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  private addTemplate(template: ContractTemplate) {
    this.snapshot = [...this.snapshot, template];
    this.updateFromSnapshot();
  }

  private updateTemplate(template: ContractTemplate) {
    this.snapshot = this.snapshot.map(item => item.id === template.id ? template : item);
    this.updateFromSnapshot();
  }
}
