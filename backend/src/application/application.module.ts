import { Module } from '@nestjs/common';
import AuthUsecase from './auth.usecase';
import DomainModule from '../domain/domain.module';
import UserRepositoryPostgres from '../infrastructure/adapters/repository/user.repository';
import ChatroomFactory from './factories/chatroom.factory';
import MessageFactory from './factories/message.factory';
import UserFactory from './factories/user.factory';
import ChatroomUsecase from './chatroom.usecase';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../infrastructure/prisma.service';
import { ConfigService } from '@nestjs/config';
import ChatroomRepositoryPostgres from '../infrastructure/adapters/repository/chatroom.repository';
import MessageRepositoryPostgres from '../infrastructure/adapters/repository/message.repository';
import UsersUsecase from './users.usecase';
@Module({
  providers: [
    AuthUsecase,
    UsersUsecase,
    ChatroomUsecase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPostgres,
    },
    {
      provide: 'ChatroomRepository',
      useClass: ChatroomRepositoryPostgres,
    },
    {
      provide: 'MessageRepository',
      useClass: MessageRepositoryPostgres,
    },
    UserFactory,
    ChatroomFactory,
    MessageFactory,
    ConfigService,
    PrismaService,
    JwtService,
  ],
  imports: [DomainModule],
  exports: [AuthUsecase, ChatroomUsecase, UsersUsecase],
})
export class ApplicationModule {}
