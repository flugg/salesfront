import { Message } from './message.model';
import { Participation } from './participation.model';

export interface User {
  id: string,
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
  participations?: Participation[];
}
