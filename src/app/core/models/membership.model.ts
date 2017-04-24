import { User } from './user.model';
import { Invite } from './invite.model';
import { Project } from './project.model';
import { Team } from './team.model';

export interface Membership {
  id: string;
  inviteId: string;
  projectId: string;
  userId: string;
  teamId: string;
  invite?: Invite;
  project?: Project;
  user?: User;
  team?: Team;
}
