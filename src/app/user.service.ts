import {DataProviderService} from "./data-provider.service";
import {ApiService} from "./api.service";
import {Inject} from "@angular/core";

@resource
export class UserService extends DataProviderService {

  all(): any {
    return undefined;
  }

  get(id: string): any {
    return undefined;
  }

  create(data: any): any {
    return undefined;
  }

  constructor(@Inject(ApiService) api: ApiService) { super(api, '/user'); }

}

export class user {
  private name: string;
  private image_path: string;
  private title: string;
}

function resource(constructor: Function){}


function methodDecorator(value: boolean) {}
