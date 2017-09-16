import { Organization } from './organization.model';
import { ContractTemplate } from './contract-template.model';

export interface Project {
  id: string;
  organizationId: string;
  contractTemplateId: string;
  name: string;
  color: 'pink' | 'purple' | 'blue' | 'light-blue' | 'teal' | 'green' | 'lime' | 'yellow' | 'orange';
  type: 'count' | 'value' | 'product';
  decimals: number;
  notation: string;
  notationBefore: boolean;
  userCount: number;
  teamCount: number;
  createdAt: string;
  updatedAt: string;
  value?: number;
  organization?: Organization;
  contractTemplate?: ContractTemplate;
}