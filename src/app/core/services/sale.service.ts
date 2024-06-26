import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RestApiService } from '../rest-api.service';
import { PaginationResponse } from '../pagination-response';
import { Sale } from '../models/sale.model';

@Injectable()
export class SaleService {
  constructor(private api: RestApiService) {}

  get(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/sales`, cursor, limit, { include: 'member.user,team' });
  }

  getForProject(projectId: string, after?: Moment, before?: Moment): Observable<Sale[]> {
    return this.api.get(`projects/${projectId}/sales`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  getAll(projectId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`projects/${projectId}/sales2`, cursor, limit, { include: 'member.user,team,product' });
  }

  getForTeam(teamId: string, limit: number, cursor?: string): Observable<PaginationResponse> {
    return this.api.paginate(`teams/${teamId}/sales`, cursor, limit);
  }

  getForMember(memberId: string, after?: Moment, before?: Moment): Observable<Sale[]> {
    return this.api.get(`members/${memberId}/sales`, {
      after: after.toISOString(),
      before: before.toISOString()
    }).map(response => response.data);
  }

  register(teamMemberId: string, date?: Moment): Promise<Sale> {
    return this.api.post(`team-members/${teamMemberId}/sales`, !date ? {} : {
      soldAt: date.toISOString() || moment().toISOString()
    }).then(response => response.data);
  }

  registerWithValue(teamMemberId: string, value: number, date?: Moment): Promise<Sale> {
    return this.api.post(`team-members/${teamMemberId}/sales`, !date ? { value: value } : {
      value: value,
      soldAt: date.toISOString() || moment().toISOString()
    }).then(response => response.data);
  }

  registerWithProduct(teamMemberId: string, productId: string, date?: Moment): Promise<Sale> {
    return this.api.post(`team-members/${teamMemberId}/sales`, !date ? { product: productId } : {
      product: productId,
      soldAt: date.toISOString() || moment().toISOString()
    }).then(response => response.data);
  }

  registerWithContract(teamMemberId: string, contract: any, signature?: string, date?: Moment): Promise<Sale> {
    return this.api.post(`team-members/${teamMemberId}/sales`, !date ? {
      contract,
      signature: signature
    } : {
      soldAt: date.toISOString() || moment().toISOString(),
      contract: contract,
      signature: signature
    }).then(response => response.data);
  }

  registerWithValueAndContract(teamMemberId: string, contract: any, value: number, signature?: string, date?: Moment): Promise<Sale> {
    return this.api.post(`team-members/${teamMemberId}/sales`, !date ? {
      value: value,
      contract: contract,
      signature: signature
    } : {
      value: value,
      contract: contract,
      signature: signature,
      soldAt: date.toISOString() || moment().toISOString()
    }).then(response => response.data);
  }

  registerWithProductAndContract(teamMemberId: string, contract: any, productId: string, signature?: string, date?: Moment): Promise<Sale> {
    return this.api.post(`team-members/${teamMemberId}/sales`, !date ? {
      product: productId,
      contract: contract,
      signature: signature
    } : {
      product: productId,
      contract: contract,
      signature: signature,
      soldAt: date.toISOString() || moment().toISOString()
    }).then(response => response.data);
  }

  delete(saleId: string): Promise<Sale> {
    return this.api.delete(`sales/${saleId}`).then(response => response.data);
  }

  deleteForMember(memberId: string): Promise<Sale> {
    return this.api.delete(`members/${memberId}/sales`).then(response => response.data);
  }
}
