import { Conversation } from './conversation.model';
import { User } from './user.model';

export interface Participation {
  id: string;
  joinedAt: string,
  leftAt?: string,
  conversationId: string;
  userId: string;
  conversation?: Conversation;
  user?: User;
}
