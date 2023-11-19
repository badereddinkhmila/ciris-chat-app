import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import AuthUsecase from '../application/auth.usecase';
import { ApplicationModule } from '../application/application.module';
import { AccessTokenStrategy } from './auth/accessToken.strategy';
import { RefreshTokenStrategy } from './auth/refreshToken.strategy';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';
import { RefreshTokenGuard } from './auth/guards/refreshToken.guard';
import { AuthController } from './controllers/auth.controller';

@Module({})
export default class InfrastructureModule {
  static foorRoot(): DynamicModule {
    return {
      module: InfrastructureModule,
      imports: [
        ApplicationModule,
        AuthUsecase,
        PassportModule,
        JwtModule.register({}),
      ],
      providers: [
        AccessTokenStrategy,
        RefreshTokenStrategy,
        AccessTokenGuard,
        RefreshTokenGuard,
      ],
      exports: [PrismaService],
      controllers: [AuthController],
    };
  }
}
