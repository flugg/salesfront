import { Project } from './project.model';
import { BudgetGoal } from './budget-goal.model';

export interface Budget {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  value: number;
  projectId: string;
  project?: Project;
  goals: BudgetGoal[];
}