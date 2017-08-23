import { Conversation } from './conversation.model';
import { Member } from './member.model';

export interface Message {
  id: string;
  body: string;
  sentAt: string;
  conversationId: string;
  memberId: string,
  conversation?: Conversation;
  member?: Member;
}
