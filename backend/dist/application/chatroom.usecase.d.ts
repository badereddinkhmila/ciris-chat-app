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
export default class ChatroomUsecase {
    private _chatroomRepository;
    private _messageRepository;
    private _chatroomFactory;
    private _messageFactory;
    constructor(_chatroomRepository: ChatroomRepository, _messageRepository: MessageRepository, _chatroomFactory: ChatroomFactory, _messageFactory: MessageFactory);
    handleCreate(_chatroomCommand: ChatroomCommand, _connectedUserID: string): Promise<Optional<Chatroom>>;
    handleGetByUserId(_connectedUserID: string): Promise<Chatroom[]>;
    handleGetByUserIds(_userIds: string[]): Promise<Chatroom>;
    handleGetMessages(_messageFilter: MessageFiltersCommand): Promise<Optional<Message[]>>;
    handleCreateMessage(_messageCommand: MessageCommand): Promise<Optional<Message>>;
    handleDeleteMessage(_messageID: string, _userID: string): Promise<Message>;
}
