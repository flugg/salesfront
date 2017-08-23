import { TeamMember } from './team-member.model';
import { Member } from './member.model';

export interface Session {
  id: string;
  clockedIn: string,
  clockedOut?: string,
  memberId: string;
  member?: Member;
  teamMemberId: string;
  teamMember?: TeamMember;
}
