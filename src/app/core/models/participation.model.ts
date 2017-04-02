import { Conversation } from './conversation.model';
import { User } from './user.model';
import { Message } from './message.model';

export interface Participation {
  id: string;
  joinedAt: string,
  leftAt?: string,
  conversationId: string;
  lastReadMessageId: string;
  userId: string;
  conversation?: Conversation;
  lastReadMessage?: Message;
  user?: User;
}
