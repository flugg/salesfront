import { Project } from './project.model';
import { User } from './user.model';
import { Invite } from './invite.model';
import { Sale } from './sale.model';
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