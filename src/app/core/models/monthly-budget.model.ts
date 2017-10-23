import { Project } from './project.model';
import { BudgetGoal } from './budget-goal.model';

export interface MonthlyBudget {
  id: string;
  month: string;
  value: number;
  projectId: string;
  project?: Project;
  goals: BudgetGoal[];
}