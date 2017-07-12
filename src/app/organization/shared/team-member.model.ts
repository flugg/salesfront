import { Team } from '../workspace/project/shared/team.model';
import { Membership } from './membership.model';

export interface TeamMember {
  id: string;
  joinedAt: string,
  leftAt?: string,
  isLeader: boolean;
  membershipId: string;
  membership?: Membership;
  teamId: string;
  team?: Team;
}
