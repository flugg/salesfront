import { Invite } from '../workspace/project/users/shared/invite.model';
import { Project } from './project.model';
import { User } from './user.model';
import { Team } from '../workspace/project/shared/team.model';
import { Sale } from '../workspace/shared/sale.model';
import { TeamMember } from './team-member.model';
import { Session } from './session.model';

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
}