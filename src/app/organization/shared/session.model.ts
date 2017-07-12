import { TeamMember } from './team-member.model';
import { Membership } from './membership.model';

export interface Session {
  id: string;
  clockedIn: string,
  clockedOut?: string,
  membershipId: string;
  membership?: Membership;
  teamMemberId: string;
  teamMember?: TeamMember;
}
