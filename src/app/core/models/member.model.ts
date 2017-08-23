import { Invite } from './invite.model';
import { Organization } from './organization.model';
import { Session } from './session.model';
import { TeamMember } from './team-member.model';
import { User } from './user.model';

export interface Member {
  id: string;
  userId: string;
  organizationId: string;
  inviteId: string;
  value?: number;
  position?: number;
  user?: User;
  organization?: Organization;
  invite?: Invite;
  teamMembers?: TeamMember[];
  activeSession?: Session;
}