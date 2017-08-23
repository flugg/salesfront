import { Membership } from './membership.model';
import { Team } from './team.model';

export interface TeamLeader {
  id: string;
  membershipId: string;
  teamId: string;
  membership?: Membership;
  team?: Team;
}
