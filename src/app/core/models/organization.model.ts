import { Project } from './project.model';
import { ContractTemplate } from './contract-template.model';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoPath: string | null;
  createdAt: string;
  updatedAt: string;
  projects?: Project[];
  contractTemplates?: ContractTemplate[];
}