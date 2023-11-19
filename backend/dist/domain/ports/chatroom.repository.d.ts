import { Optional } from 'typescript-optional';
import Chatroom from '../chatroom.model';
export interface ChatroomRepository {
    createChatroom(chatroom: Chatroom): Promise<Optional<Chatroom>>;
    getByID(id: string): Promise<Chatroom>;
}
