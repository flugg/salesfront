import { Injectable, OnDestroy } from '@angular/core';
import { ObservableResourceList } from './sockets/observable-resource-list';
import { Observable } from 'rxjs/Observable';
import { SocketApiService } from './sockets/socket-api.service';
import { RestApiService } from './http/rest-api.service';

@Injectable()
export class ResourceListService extends ObservableResourceList implements OnDestroy {

  /**
   * The observable list of resources.
   */
  private readonly resourceList: Observable<any[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private restApi: RestApiService) {
    super();
  }

  /**
   * Gets the resource list or makes request to api if it's empty
   */
  get(url: string, parameters?: any) {
    if (!this.subject) {
      this.paginator.subscribe(limit => {
        this.pagination(this.restApi.paginate(url, this.cursor, limit, parameters))
            .subscribe(resource => this.add(resource));
      });
    }
    return this.resourceList;
  }

  /**
   * Moves the conversation to the front of the list.
   */
  moveToFront(resource: any) {
    this.snapshot = this.snapshot.filter(item => item.id !== resource.id);
    this.snapshot.unshift(resource);
    this.updateFromSnapshot();
  }

  /**
   * Adds an entry to an array of a given resource.
   */
  addToSubList(id: string, field: string, resource: any) {
    this.findField(field, this.snapshot.find(item => item.id === id)).push(resource);
    this.updateFromSnapshot();
  }

  /**
   * find field
   */
  private findField(field: string, resource: any): any {
    // TODO implement
  }

  /**
   * Destroys the service.
   */
  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

}
