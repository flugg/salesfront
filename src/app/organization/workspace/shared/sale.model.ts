import { Project } from '../../shared/project.model';
import { Team } from '../project/shared/team.model';
import { Membership } from '../../shared/membership.model';

export interface Sale {
  id: string;
  projectId: string;
  teamId: string;
  membershipId: string;
  createdAt: string;
  project?: Project;
  team?: Team;
  membership?: Membership;
}
