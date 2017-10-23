import { Budget } from './budget.model';
import { TeamMember } from './team-member.model';

export interface BudgetGoal {
  id: string;
  progress: number;
  value: number;
  budgetId: string;
  teamMemberId: string;
  budget?: Budget;
  teamMember?: TeamMember;
}