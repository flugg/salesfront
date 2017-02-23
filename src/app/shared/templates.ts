export class Conversation{
  id: string;
  group = false;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
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
  userId: string;
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
