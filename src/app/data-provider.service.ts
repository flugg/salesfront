import {Injectable, EventEmitter, Inject} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export abstract class DataProviderService {
  // set preferred emitting type in child classes
  protected aviableData: EventEmitter<any>;

  constructor(protected api: ApiService,
              protected subpath: string) { }

  abstract all(): any;
  abstract get(id: string): any;
  abstract create(data: any): any;


}
