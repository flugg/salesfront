import { User } from "./user";
export class Conversation{
  id: string;
  group = false;
  createdAt: string;
  updatedAt: string;
  lastMessage: Message;
  participations: Participation[];
}

export class Message{
  id: string;
  body: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  conversationId: string;
}

export class Participation{
  id: string;
  user: User;
  conversationId: string;
}

export class UserConversationSession{
  userId: string;
  conversationId: string;
  updatedAt: string;
}

export class Session{
  token: string;
  userId: string;
  projectId: string;
  role: string;
}


export class project{
  constructor(public name, public image){}
}