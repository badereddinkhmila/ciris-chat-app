import { Module } from '@nestjs/common';
import AuthUsecase from './auth.usecase';
import DomainModule from '../domain/domain.module';
import UserRepositoryPostgres from '../infrastructure/adapters/repository/user.repository';
import ChatroomFactory from './factories/chatroom.factory';
import MessageFactory from './factories/message.factory';
import UserFactory from './factories/user.factory';
import ChatroomUsecase from './chatroom.usecase';
import MessageUsecase from './message.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../infrastructure/prisma.service';
import { ConfigService } from '@nestjs/config';
@Module({
  providers: [
    AuthUsecase,
    ChatroomUsecase,
    MessageUsecase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPostgres,
    },
    UserFactory,
    ChatroomFactory,
    MessageFactory,
    ConfigService,
    PrismaService,
    JwtService,
  ],
  imports: [DomainModule, JwtModule.register({})],
  exports: [
    UserFactory,
    ChatroomFactory,
    MessageFactory,
    AuthUsecase,
    ChatroomUsecase,
    MessageUsecase,
  ],
})
export class ApplicationModule {}
