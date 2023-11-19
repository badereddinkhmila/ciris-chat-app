import { Optional } from 'typescript-optional';
import Message from '../message.model';
export interface MessageRepository {
    getMessagesByChatroom(chatroomId: string, lastFetchedDate: Date): Promise<Message[]>;
    createMessage(message: Message): Promise<Optional<Message>>;
    deleteMessage(messageId: string): Promise<boolean>;
}
