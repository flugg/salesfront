import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skip';

import { CursorMeta } from '../cursor-meta';

export class ResourceListSubject<Array> extends BehaviorSubject<any> {

  /**
   * The current cursor meta object.
   */
  private cursor: CursorMeta;

  /**
   * Sets the cursor meta data.
   */
  public setCursor(cursor: CursorMeta) {
    this.cursor = cursor;
  }

  /**
   * Retrieves the next cursor.
   */
  public nextCursor() {
    return this.cursor ? this.cursor.next : null;
  }

  /**
   * Checks if an item with the given id exists in the list.
   */
  public has(id: string) {
    return this.value.find(item => item.id === id);
  }

  /**
   * Prepends a new item to the list.
   */
  public prepend(item: any) {
    this.value.unshift(item);
    this.next(this.value);
  }

  /**
   * Prepends many new items to the list.
   */
  public prependMany(items: any[]) {
    this.value.unshift(...items);
    this.next(this.value);
  }

  /**
   * Appends a new item to the list.
   */
  public append(item: any) {
    this.value.push(item);
    this.next(this.value);
  }

  /**
   * Appends many new items to the list.
   */
  public appendMany(items: any[]) {
    this.value.push(...items);
    this.next(this.value);
  }

  /**
   * Adds new related item to the list of resources.
   */
  public addRelated(id: string, key: string, nestedItem: any) {
    this.value.find(item => item.id === id)[key].push(nestedItem);
    this.next(this.value);
  }

  /**
   * Adds many new related items to the list of resources.
   */
  public addManyRelated(id: string, key: string, nestedItems: any[]) {
    this.value.find(item => item.id === id)[key] = this.value.concat(nestedItems);
    this.next(this.value);
  }

  /**
   * Sets an item based on id.
   */
  public set(id: string, key: string, value: any) {
    const field = this.value.find(item => item.id === id);

    if (field) {
      field[key] = value;
      field[key + 'Id'] = value.id;
      this.next(this.value);
    }
  }

  /**
   * Sets a related item based on id.
   */
  public setRelated(id: string, key: string, relatedId: string, value: any) {
    const relations = this.value.find(item => item.id === id)[key].map(relation => {
      return relation.id === relatedId ? value : relation;
    });

    this.value.find(item => item.id === id)[key] = relations;
    this.next(this.value);
  }

  /**
   * Converts the subject to an observable.
   */
  asObservable(): Observable<any> {
    return super.asObservable().skip(1);
  }
}