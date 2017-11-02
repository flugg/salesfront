import { Organization } from './organization.model';
import { User } from './user.model';

export interface Spectator {
  id: string;
  userId: string;
  organizationId: string;
  user?: User;
  organization?: Organization;
}