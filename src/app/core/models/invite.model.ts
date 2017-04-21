export interface Invite {
    id: string;
    projectId: string;
    senderId: string;
    email: string;
    token: string;
    isUsed: boolean;
    sentAt: string;
    cancelledAt: string;
}