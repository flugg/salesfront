import { Injectable } from '@angular/core';
import { DataProviderService, SubjectBag } from "../../data-provider.service";

@Injectable()
export class ConversationsService {
  private conversations: SubjectBag;

  constructor(private provider: DataProviderService) {
    this.conversations = this.provider.get('conversations'); // openChannel(['conversations'], 'Conversations'); //
  }

  getConversations(){
    return this.conversations;
  }

}
