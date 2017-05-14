import { Conversation } from './conversation.model';
import { User } from '../../../shared/user.model';

export interface Message {
  id: string;
  body: string;
  sentAt: string;
  conversationId: string;
  userId: string,
  conversation?: Conversation;
  user?: User;
}
