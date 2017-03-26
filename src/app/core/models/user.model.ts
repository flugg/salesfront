import { Message } from './message.model';
import { Participation } from './participation.model';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
  participations?: Participation[];
}
