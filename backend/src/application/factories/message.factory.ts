import { Injectable } from '@nestjs/common';
import Message from '../../domain/message.model';
import MessageCommand from '../commands/message.command';

@Injectable()
export default class MessageFactory {
  public createUser(_messageCommand: MessageCommand): Message {
    return new Message(
      _messageCommand.message,
      _messageCommand.chatroomId,
      _messageCommand.createBy,
    );
  }
}
