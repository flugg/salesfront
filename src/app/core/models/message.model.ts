import { Conversation } from './conversation.model';
import { User } from './user.model';

export interface Message {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  conversationId: string;
  userId: string;
  conversation?: Conversation;
  user?: User;
}
