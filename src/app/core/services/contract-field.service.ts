import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { ContractField } from '../models/contract-field.model';
import { RestApiService } from '../rest-api.service';

@Injectable()
export class ContractFieldService {
  constructor(private api: RestApiService) {}

  add(templateId: string, name: string): Promise<ContractField> {
    return this.api.post(`contract-templates/${templateId}/contract-fields`, { name }).then(response => response.data);
  }

  delete(fieldId: string): Promise<ContractField> {
    return this.api.delete(`contract-fields/${fieldId}`).then(response => response.data);
  }
}
