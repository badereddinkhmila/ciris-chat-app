import { Request } from 'express';
import ChatroomUsecase from '../../application/chatroom.usecase';
import ChatroomCommand from '../../application/commands/chatroom.command';
export declare class ChatroomController {
    private _chatroomUsecase;
    constructor(_chatroomUsecase: ChatroomUsecase);
    createChatroom(_req: Request, _chatroomCommand: ChatroomCommand): Promise<import("typescript-optional").Optional<import("../../domain/chatroom.model").default>>;
    getChatrooms(_req: Request, _userId: string): Promise<import("../../domain/chatroom.model").default[]> | Promise<import("../../domain/chatroom.model").default>;
    createMessage(_chatroomID: string, _req: Request, _message: string): Promise<import("typescript-optional").Optional<import("../../domain/message.model").default>>;
    getMessages(_chatroomID: string, lastDate: string): Promise<import("typescript-optional").Optional<import("../../domain/message.model").default[]>>;
    deleteMessage(_messageID: string, _req: Request): Promise<import("../../domain/message.model").default>;
}
