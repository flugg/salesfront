import { Project } from '../../../shared/project.model';
import { User } from '../../../shared/user.model';
import { Sale } from '../../shared/sale.model';

export interface Team {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  project?: Project;
  users?: User[];
  sales?: Sale[];
  position?: number;
}
