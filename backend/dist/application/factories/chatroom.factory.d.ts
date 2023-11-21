import Chatroom from '../../domain/chatroom.model';
import ChatroomCommand from '../commands/chatroom.command';
export default class ChatroomFactory {
    createChatroom(_chatroomCommand: ChatroomCommand): Chatroom;
}
