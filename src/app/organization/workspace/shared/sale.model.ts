import { Team } from '../project/shared/team.model';
import { Membership } from '../../shared/membership.model';
import { User } from '../../shared/user.model';
import { TeamMember } from '../../shared/team-member.model';

export interface Sale {
  id: string;
  soldAt: string;
  membershipId: string;
  membership?: Membership;
  teamId: string;
  team?: Team;
  teamMemberId: string;
  teamMember: TeamMember;
  registererId: string;
  registerer?: User;
}
