import { Project } from './project.model';
import { User } from './user.model';

export interface Invite {
  id: string;
  projectId: string;
  senderId: string;
  email: string;
  token: string;
  isUsed: boolean;
  sentAt: string;
  cancelledAt: string;
  project?: Project;
  sender?: User;
}