import { Invite } from './invite.model';
import { Project } from '../../../../core/project.model';
import { Team } from './team.model';
import { User } from '../../../../core/user.model';

export interface Membership {
  id: string;
  inviteId: string;
  projectId: string;
  teamId: string;
  userId: string;
  invite?: Invite;
  project?: Project;
  team?: Team;
  user?: User;
}
