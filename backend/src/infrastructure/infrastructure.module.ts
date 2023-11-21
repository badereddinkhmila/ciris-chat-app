import { PrismaService } from './prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApplicationModule } from '../application/application.module';
import { AccessTokenStrategy } from './auth/accessToken.strategy';
import { RefreshTokenStrategy } from './auth/refreshToken.strategy';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';
import { RefreshTokenGuard } from './auth/guards/refreshToken.guard';
import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { ChatroomController } from './controllers/chatroom.controller';
import { SocketGateway } from './socket/socket.gateway';
import UserRepositoryPostgres from './adapters/repository/user.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ApplicationModule, PassportModule, JwtModule.register({})],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
    PrismaService,
    SocketGateway,
    ConfigService,
    JwtService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPostgres,
    },
  ],
  controllers: [AuthController, UsersController, ChatroomController],
})
export default class InfrastructureModule {}
