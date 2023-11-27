import { Injectable } from '@nestjs/common';
import Chatroom from '../../domain/chatroom.model';
import ChatroomCommand from '../commands/chatroom.command';

@Injectable()
export default class ChatroomFactory {
  public createChatroom(_chatroomCommand: ChatroomCommand): Chatroom {
    return new Chatroom('', _chatroomCommand.users);
  }
}
