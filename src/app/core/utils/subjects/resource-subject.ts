import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skip';

export class ResourceSubject<Object> extends BehaviorSubject<any> {

  /**
   * Sets an item on the resource.
   */
  public set(key: string, value: any) {
    this.value[key] = value;
    this.next(this.value);
  }

  /**
   * Adds new related item to the list of resources.
   */
  public addRelated(key: string, nestedItem: any) {
    this.value[key].push(nestedItem);
    this.next(this.value);
  }

  /**
   * Sets a related item based on id.
   */
  public setRelated(key: string, relatedId: number, value: any) {
    this.value[key] = this.value[key].map(relation => {
      return relation.id === relatedId ? value : relation;
    });

    this.next(this.value);
  }

  /**
   * Converts the subject to an observable.
   */
  asObservable(): Observable<any> {
    return super.asObservable().skip(1);
  }
}