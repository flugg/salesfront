import { Team } from './team.model';
import { Member } from './member.model';

export interface TeamMember {
  id: string;
  joinedAt: string,
  leftAt?: string,
  isLeader: boolean;
  value?: number;
  enabled?: boolean;
  memberId: string;
  teamId: string;
  member?: Member;
  team?: Team;
}
