import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { ContractTemplate } from '../../../../../core/models/contract-template.model';
import { ObservableResource } from '../../../../../core/observable-resource';
import { ContractTemplateService } from '../../../../../core/services/contract-template.service';
import { SocketApiService } from '../../../../../core/socket-api.service';

@Injectable()
export class SelectedTemplateService extends ObservableResource implements OnDestroy {
  readonly template: Observable<ContractTemplate> = this.subject.asObservable();

  constructor(private route: ActivatedRoute,
              private sockets: SocketApiService,
              private templateService: ContractTemplateService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.sockets.stopListening(this);

      this.route.params.subscribe(params => {
        this.templateService.find(params['template']).subscribe(template => {
          this.set(template);
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }
}