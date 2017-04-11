import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skip';

export class ResourceSubject<Object> extends BehaviorSubject<any> {

  /**
   * Sets an item on the resource.
   */
  public set(key: string, value: any) {
    const resource = Object.assign({}, this.value);
    resource[key] = value;

    this.next(resource);
  }

  /**
   * Adds new related item to the list of resources.
   */
  public addRelated(key: string, nestedItem: any) {
    const resource = Object.assign({}, this.value);
    resource[key].push(nestedItem);

    this.next(resource);
  }

  /**
   * Sets a related item based on id.
   */
  public setRelated(key: string, relatedId: number, value: any) {
    const resource = Object.assign({}, this.value);
    resource[key] = resource[key].map(relation => {
      return relation.id === relatedId ? value : relation;
    });

    this.next(resource);
  }

  /**
   * Converts the subject to an observable.
   */
  asObservable(): Observable<any> {
    return super.asObservable().skip(1);
  }
}