import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ContractTemplate } from '../models/contract-template.model';
import { PaginationResponse } from '../pagination-response';
import { RestApiService } from '../rest-api.service';

@Injectable()
export class ContractTemplateService {
  constructor(private api: RestApiService) {}

  get(organizationId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`organizations/${organizationId}/contract-templates`, cursor, limit);
  }

  list(organizationId: string): Observable<ContractTemplate[]> {
    return this.api.get(`organizations/${organizationId}/contract-templates`).map(response => response.data);
  }

  find(id: string): Observable<ContractTemplate> {
    return this.api.get(`contract-templates/${id}`).map(response => response.data);
  }

  register(organizationId: string, name: string, fields: string[], signature: boolean): Promise<ContractTemplate> {
    return this.api.post(`organizations/${organizationId}/contract-templates`, { name, fields, signature }).then(response => response.data);
  }

  update(templateId: string, name: string, fields: string[], signature: boolean): Promise<ContractTemplate> {
    return this.api.put(`contract-templates/${templateId}`, { name, fields, signature }).then(response => response.data);
  }
}
