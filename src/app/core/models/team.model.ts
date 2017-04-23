import { User } from './user.model';
export interface Team {
    id: string;
    projectId: string;
    members?: User[];
    budget?: any;
    createdAt: string;
    updatedAt: string;
}