import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Message from '../../domain/message.model';
import ChatroomUsecase from '../../application/chatroom.usecase';
export declare class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly _chatroomUsecase;
    private logger;
    server: Server;
    constructor(_chatroomUsecase: ChatroomUsecase);
    afterInit(client: Socket): void;
    handleChatEvent(payload: Message, client: Socket): Promise<Message>;
    handleSetClientDataEvent(payload: {
        userId: string;
        chatroomId: string;
    }, client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: any): any;
}
