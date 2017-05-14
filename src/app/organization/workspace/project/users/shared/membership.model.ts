import { Invite } from './invite.model';
import { Project } from '../../../../shared/project.model';
import { User } from '../../../../shared/user.model';
import { Team } from '../../shared/team.model';

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
