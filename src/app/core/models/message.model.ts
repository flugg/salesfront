import { Conversation } from './conversation.model';
import { User } from './user.model';

export interface Message {
  id: string;
  body: string;
  sentAt: string;
  conversationId: string;
  conversation?: Conversation;
  userId: string,
  user?: User;
}
