import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { SocketGuard } from './socket.guard';
import Message from '../../domain/message.model';
import { SocketAuthMiddleware } from './socket.middleware';
import { ClientToServerEvents, ServerToClientEvents } from './message.socket';
import ChatroomUsecase from '../../application/chatroom.usecase';
@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
  },
})
@UseGuards(SocketGuard)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('ChatGateway');

  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();

  constructor(
    @Inject(ChatroomUsecase) private readonly _chatroomUsecase: ChatroomUsecase,
  ) {}
  // For jwt guard
  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
  }

  // Receiving and broadcasting messages
  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody()
    payload: Message,
    @ConnectedSocket() client: Socket,
  ): Promise<Message> {
    client.join(payload.chatroomId);
    // Store the message
    try {
      const message = await this._chatroomUsecase.handleCreateMessage(payload);
      if (message.isEmpty())
        throw new WsException({
          code: 500,
          message: 'Error Creating a message!',
        });
      this.server.to(payload.chatroomId).emit('chat', message.get());
      return message.get();
    } catch (error) {
      throw new WsException({
        code: 500,
        message: 'Error Creating a message!',
      });
    }
  }

  // Subscribing Users To the same Room
  @SubscribeMessage('join_chatroom')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: {
      userId: string;
      chatroomId: string;
    },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    if (payload.chatroomId && payload.userId) {
      this.logger.log(`${payload.userId} is joining ${payload.chatroomId}`);
      client.join(payload.chatroomId);
      this.server.in(payload.userId).socketsJoin(payload.chatroomId);
      return;
    }
    console.log('doing it wrong');
    return;
  }
  async handleConnection(client: Socket): Promise<void> {
    this.logger.log(`Socket connected: ${client.id}`);
  }

  handleDisconnect(client: any): any {
    this.logger.log(`Socket connected: ${client.id}`);
  }
}
