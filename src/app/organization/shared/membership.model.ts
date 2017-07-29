import { Invite } from '../workspace/project/users/shared/invite.model';
import { Project } from './project.model';
import { User } from './user.model';
import { Sale } from '../workspace/shared/sale.model';
import { TeamMember } from './team-member.model';
import { Session } from './session.model';
import { TopDailySeller } from '../workspace/project/wall-of-fame/shared/top-daily-seller.model';

export interface Membership {
  id: string;
  position?: number;
  inviteId: string;
  invite?: Invite;
  projectId: string;
  project?: Project;
  userId: string;
  user?: User;
  activeSession?: Session;
  teamMembers?: TeamMember[];
  sales?: Sale[];
  topDailySellers: TopDailySeller[];
}