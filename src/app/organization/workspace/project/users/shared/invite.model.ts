import { Project } from '../../../../shared/project.model';
import { User } from '../../../../shared/user.model';

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