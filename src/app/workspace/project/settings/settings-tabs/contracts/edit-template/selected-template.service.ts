import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { ObservableResource } from '../../../../../../core/observable-resource';
import { ContractTemplate } from '../../../../../../core/models/contract-template.model';
import { SocketApiService } from '../../../../../../core/socket-api.service';
import { ContractTemplateService } from '../../../../../../core/services/contract-template.service';

@Injectable()
export class SelectedTemplateService extends ObservableResource implements OnDestroy {
  readonly template: Observable<ContractTemplate> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private templateService: ContractTemplateService) {
    super();

    this.route.params.subscribe(params => {
      this.templateService.find(params['template']).subscribe(template => {
        this.set(template);
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}