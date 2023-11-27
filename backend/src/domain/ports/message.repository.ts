import { Optional } from 'typescript-optional';
import Message from '../message.model';
export interface MessageRepository {
  getMessagesByChatroom(
    chatroomId: string,
    lastFetchedDate: string,
  ): Promise<Optional<Message[]>>;
  getMessagesByID(id: string): Promise<Optional<Message>>;

  createMessage(message: Message): Promise<Optional<Message>>;

  softDeleteMessage(messageId: string): Promise<Message>;
}
