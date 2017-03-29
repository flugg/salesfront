import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CursorMeta } from '../cursor-meta';

export class ResourceListSubject<Array> extends BehaviorSubject<any> {

  /**
   * The current cursor meta object.
   */
  private cursor: CursorMeta;

  /**
   * Set the current cursor meta object.
   */
  public setCursor(cursor: CursorMeta) {
    this.cursor = cursor;
  }

  /**
   * Get the next cursor.
   */
  public nextCursor() {
    return this.cursor && this.cursor.next ? this.cursor.next : null;
  }

  /**
   * Prepends a new item to the list of resources.
   */
  public prepend(item: any) {
    this.value.unshift(item);
    this.next(this.value);
  }

  /**
   * Prepends many new items to the list of resources.
   */
  public prependMany(items: Array[]) {
    this.value.unshift(...items);
    this.next(this.value);
  }

  /**
   * Appends a new item to the list of resources.
   */
  public append(item: any) {
    this.value.push(item);
    this.next(this.value);
  }

  /**
   * Appends many new items to the list of resources.
   */
  public appendMany(items: Array[]) {
    this.value.push(...items);
    this.next(this.value);
  }

  /**
   * Adds new related item to the list of resources.
   */
  public addRelated(key: string, nestedItem: any, id: number) {
    this.value.find(item => item.id === id)[key].push(nestedItem);
    this.next(this.value);
  }

  /**
   * Adds many new related items to the list of resources.
   */
  public addManyRelated(key: string, nestedItems: any, id: number) {
    this.value.find(item => item.id === id)[key] = this.value.concat(nestedItems);
    this.next(this.value);
  }

  /**
   * Sets an item based on id.
   */
  public set(key: string, value: any, id: number) {
    const field = this.value.find(item => item.id === id);

    if (field && field.hasOwnProperty(key)) {
      field[key] = value;
      this.next(this.value);
    }
  }

  /**
   * Sets a related item based on id.
   */
  public setRelated(key: string, value: any, id: number, relatedId: number) {
    const relations = this.value.find(item => item.id === id)[key].map(relation => {
      return relation.id === relatedId ? value : relation;
    });

    this.value.find(item => item.id === id)[key] = relations;
    this.next(this.value);
  }
}