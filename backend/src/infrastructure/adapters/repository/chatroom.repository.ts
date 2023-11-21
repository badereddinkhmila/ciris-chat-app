import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import { PrismaService } from '../../prisma.service';
import { ChatroomRepository } from '../../../domain/ports/chatroom.repository';
import Chatroom from '../../../domain/chatroom.model';

@Injectable()
export default class ChatroomRepositoryPostgres implements ChatroomRepository {
  constructor(private readonly _prismaService: PrismaService) {}
  async createChatroom(_chatroom: Chatroom): Promise<Optional<Chatroom>> {
    const chatroom = await this._prismaService.chatroom.create({
      data: {
        users: {
          connect: [_chatroom.users[0], _chatroom.users[1]],
        },
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    return Optional.of(new Chatroom(chatroom.id, chatroom.users));
  }

  async getByID(id: string): Promise<Chatroom> {
    const chatroom = await this._prismaService.chatroom.findUnique({
      where: {
        id: id,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    return new Chatroom(chatroom.id, chatroom.users);
  }
}
