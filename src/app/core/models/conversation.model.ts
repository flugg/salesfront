import { Message } from './message.model';
import { Participation } from './participation.model';

export interface Conversation {
  id: string;
  group: boolean;
  createdAt: string;
  updatedAt: string;
  lastMessageId?: string;
  lastMessage?: Message;
  participations: Participation[];
  messages?: Message[];
}
