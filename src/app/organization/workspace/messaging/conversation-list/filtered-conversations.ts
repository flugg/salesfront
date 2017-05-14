import { Pipe, PipeTransform } from '@angular/core';

import { Conversation } from '../shared/conversation.model';

@Pipe({
  name: 'filteredConversations',
  pure: false
})
export class FilteredConversationsPipe implements PipeTransform {

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
