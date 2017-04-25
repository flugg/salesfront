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
  setCursor(cursor: CursorMeta) {
    this.cursor = cursor;
  }

  /**
   * Retrieves the next cursor.
   */
  nextCursor() {
    return this.cursor ? this.cursor.next : null;
  }

  /**
   * Checks if an item with the given id exists in the list.
   */
  has(id: string) {
    return !!this.value.find(item => item.id === id);
  }

  /**
   * Moves an item to the front of the list.
   */
  moveToFront(id: string) {
    const list = this.value.slice();
    const resource = list.find(item => item.id === id);
    const items = list.filter(item => item.id !== id);
    items.unshift(resource);

    this.updateList(items);
  }

  /**
   * Moves an item to the back of the list.
   */
  moveToBack(id: string) {
    const list = this.value.slice();
    const resource = list.find(item => item.id === id);
    const items = list.filter(item => item.id !== id);
    items.push(resource);

    this.updateList(items);
  }

  /**
   * Prepends a new item to the list.
   */
  prepend(item: any) {
    this.prependMany([item]);
  }

  /**
   * Prepends many new items to the list.
   */
  prependMany(items: any[]) {
    const list = this.value.slice();
    list.unshift(...items);

    this.updateList(list);
  }

  /**
   * Appends a new item to the list.
   */
  append(item: any) {
    this.appendMany([item]);
  }

  /**
   * Appends many new items to the list.
   */
  appendMany(items: any[]) {
    const list = this.value.slice();
    list.push(...items);

    this.updateList(list);
  }

  /**
   * Adds new related item to the list of resources.
   */
  addRelated(id: string, key: string, nestedItem: any) {
    const list = this.value.slice();
    list.find(item => item.id === id)[key].push(nestedItem);

    this.updateList(list);
  }

  /**
   * Adds many new related items to the list of resources.
   */
  addManyRelated(id: string, key: string, nestedItems: any[]) {
    const list = this.value.slice();
    list.find(item => item.id === id)[key] = list.concat(nestedItems);

    this.updateList(list);
  }

  /**
   * Sets an item based on id.
   */
  set(id: string, key: string, value: any) {
    const list = this.value.slice();
    const field = list.find(item => item.id === id);

    if (field) {
      field[key] = value;
      field[key + 'Id'] = value.id;

      this.updateList(list);
    }
  }

  /**
   * Removes an entry based on the given value.
   * */
  remove(value: any) {
    const list = this.value.slice();
    const index = list.indexOf(value);

    if (index) {
      list.splice(index, 1);
      this.updateList(list);
    }
  }

  /**
   * Sets a related item based on id.
   */
  setRelated(id: string, key: string, relatedId: string, value: any) {
    const list = this.value.slice();
    const relations = list.find(item => item.id === id)[key].map(relation => {
      return relation.id === relatedId ? value : relation;
    });

    list.find(item => item.id === id)[key] = relations;

    this.updateList(list);
  }

  /**
   * Converts the subject to an observable.
   */
  asObservable(): Observable<any> {
    return super.asObservable().skip(1);
  }

  /**
   * Updates the subject list and force unique items.
   */
  private updateList(list: any) {
    const ids = [];

    this.next(list.filter(item => {
      return ids.indexOf(item.id) === -1 && ids.push(item.id);
    }));
  }
}