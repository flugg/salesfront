import { Pipe, PipeTransform } from '@angular/core';

import { Conversation } from '../../core/models/conversation.model';

@Pipe({
  name: 'ignoreEmpty',
  pure: false,
})
export class IgnoreEmptyPipe implements PipeTransform {

  /**
   * Transforms the data to only include non-empty conversations.
   */
  transform(conversations: Conversation[]): any {
    if (conversations) {
      return conversations.filter(conversation => {
        return conversation.lastMessage !== null;
      });
    }
  }
}
