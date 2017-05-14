import { Conversation } from './conversation.model';
import { Message } from './message.model';
import { User } from '../../../shared/user.model';

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
