import { Pipe, PipeTransform } from '@angular/core';

import { Conversation } from '../../../core/models/conversation.model';

@Pipe({
  name: 'filteredConversations',
  pure: false
})
export class FilteredConversationsPipe implements PipeTransform {
  transform(conversations: Conversation[]): any {
    if (conversations) {
      return conversations.filter(conversation => {
        return conversation.lastMessage !== null;
      });
    }
  }
}
