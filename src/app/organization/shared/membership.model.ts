import { Invite } from '../workspace/project/users/shared/invite.model';
import { Project } from './project.model';
import { User } from './user.model';
import { Team } from '../workspace/project/shared/team.model';
import { Sale } from '../workspace/shared/sale.model';

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
  sales?: Sale[];
}
