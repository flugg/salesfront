export interface Project {
  id: string;
  organizationId: string;
  name: string;
  userCount: number;
  teamCount: number;
  createdAt: string;
  updatedAt: string;
  value?: number;
}