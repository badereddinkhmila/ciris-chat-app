import Chatroom from '../../domain/chatroom.model';
import ChatroomCommand from '../commands/chatroom.command';
export default class ChatroomFactory {
    createUser(_chatroomCommand: ChatroomCommand): Chatroom;
}
