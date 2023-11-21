import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import { PrismaService } from '../../prisma.service';
import { MessageRepository } from '../../../domain/ports/message.repository';
import Message from 'src/domain/message.model';

@Injectable()
export default class MessageRepositoryPostgres implements MessageRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async getMessagesByChatroom(
    chatroomId: string,
    lastFetchedDate: string,
  ): Promise<Optional<Message[]>> {
    return Optional.of(
      await this._prismaService.message.findMany({
        where: {
          chatroomId: chatroomId,
          createdAt: {
            lt: lastFetchedDate,
          },
        },
        take: 30,
      }),
    );
  }

  async getMessagesByID(id: string): Promise<Optional<Message>> {
    return Optional.of(
      await this._prismaService.message.findUnique({
        where: {
          id: id,
        },
      }),
    );
  }
  async createMessage(message: Message): Promise<Optional<Message>> {
    return Optional.of(
      await this._prismaService.message.create({
        data: {
          message: message.message,
          chatroom: {
            connect: {
              id: message.chatroomId,
            },
          },
          createdBy: message.createdBy,
        },
        include: {
          chatroom: true,
        },
      }),
    );
  }
  async softDeleteMessage(messageId: string): Promise<boolean> {
    const message = await this._prismaService.message.update({
      where: {
        id: messageId,
      },
      data: {
        deletedAt: new Date(Date.now()),
      },
    });
    return !!message?.id;
  }
}
