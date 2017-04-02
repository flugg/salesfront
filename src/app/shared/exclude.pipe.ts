import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exclude',
  pure: false,
})
export class ExcludePipe implements PipeTransform {

  /**
   * Transforms the data to exclude given items.
   */
  transform(items: any[], excludedItems: any): any {
    if (items) {
      if (Array.isArray(excludedItems)) {
        return items.filter(item => {
          return ! excludedItems.find(excludedItem => item.id === excludedItem.id);
        });
      } else {
        return items.filter(item => item.id !== excludedItems.id);
      }
    }
  }
}
