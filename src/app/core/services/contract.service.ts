import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';

@Injectable()
export class ContractService {
  constructor(private api: RestApiService) {}
}
