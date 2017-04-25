import { User } from './user.model';
import { Project } from './project.model';

export interface Team {
    id: string;
    name: string;
    projectId: string;
    project?: Project;
    members?: User[];
    createdAt: string;
    updatedAt: string;
}
