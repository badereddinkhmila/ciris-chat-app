import {
  Injectable,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Optional } from 'typescript-optional';
import Chatroom from '../domain/chatroom.model';
import ChatroomCommand from './commands/chatroom.command';
import ChatroomFactory from './factories/chatroom.factory';
import { ChatroomRepository } from '../domain/ports/chatroom.repository';
import MessageFiltersCommand from './commands/messageFilters.command';
import { MessageRepository } from '../domain/ports/message.repository';
import Message from '../domain/message.model';
import MessageCommand from './commands/message.command';
import MessageFactory from './factories/message.factory';

@Injectable()
export default class ChatroomUsecase {
  constructor(
    @Inject('ChatroomRepository')
    private _chatroomRepository: ChatroomRepository,
    @Inject('MessageRepository')
    private _messageRepository: MessageRepository,
    private _chatroomFactory: ChatroomFactory,
    private _messageFactory: MessageFactory,
  ) {}
  public handleCreate(
    _chatroomCommand: ChatroomCommand,
    _connectedUserID: string,
  ): Promise<Optional<Chatroom>> {
    if (
      Array.from(new Set(_chatroomCommand.users.map((item: any) => item.id)))
        .length != 2 ||
      !_chatroomCommand.users.some((user) => user.id === _connectedUserID)
    )
      throw new BadRequestException('Chatroom requires two different users!');
    const chatroom = this._chatroomFactory.createChatroom(_chatroomCommand);
    try {
      return this._chatroomRepository.createChatroom(chatroom);
    } catch (error) {
      throw new BadRequestException('Error inserting...');
    }
  }

  public handleGetMessages(
    _messageFilter: MessageFiltersCommand,
  ): Promise<Optional<Message[]>> {
    return this._messageRepository.getMessagesByChatroom(
      _messageFilter.chatroomId,
      _messageFilter.lastDateFetched,
    );
  }

  public handleCreateMessage(
    _messageCommand: MessageCommand,
  ): Promise<Optional<Message>> {
    const message = this._messageFactory.createMessage(_messageCommand);
    try {
      return this._messageRepository.createMessage(message);
    } catch (error) {
      throw new Error('Error inserting...');
    }
  }
  public async handleDeleteMessage(
    _messageID: string,
    _userID: string,
  ): Promise<boolean> {
    const message = await this._messageRepository.getMessagesByID(_messageID);
    if (message.isPresent() && message.get().createdBy != _userID)
      throw new UnauthorizedException(
        "You're not allowed to alter this resource",
      );
    try {
      return this._messageRepository.softDeleteMessage(_messageID);
    } catch (error) {
      throw new BadRequestException('Error deleting...');
    }
  }
}
