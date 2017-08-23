import { Conversation } from './conversation.model';
import { Message } from './message.model';
import { Member } from './member.model';

export interface Participation {
  id: string;
  joinedAt: string,
  leftAt?: string,
  conversationId: string;
  lastReadMessageId: string;
  memberId: string;
  conversation?: Conversation;
  lastReadMessage?: Message;
  member?: Member;
}
