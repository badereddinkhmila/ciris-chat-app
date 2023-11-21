import Message from '../../domain/message.model';

export interface ServerToClientEvents {
  chat: (e: Message) => void;
}

export interface ClientToServerEvents {
  chat: (e: Message) => void;
  join_room: (e: {
    userID: string;
    socketID: string;
    chatroomID: string;
  }) => void;
}
