import { Organization } from './organization.model';
import { ContractField } from './contract-field.model';

export interface ContractTemplate {
  id: string;
  name: string;
  signature: boolean;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  fields?: ContractField[];
  organization?: Organization;
}
