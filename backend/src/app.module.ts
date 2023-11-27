import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import InfrastructureModule from './infrastructure/infrastructure.module';
import DomainModule from './domain/domain.module';
import config from './config';
import { ApplicationModule } from './application/application.module';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    InfrastructureModule,
    DomainModule,
    PassportModule,
    JwtModule.register({}),
    ApplicationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  static clientUrl: string;
  constructor(_config: ConfigService) {
    AppModule.port = _config.get<number>('APP_PORT');
    AppModule.clientUrl = _config.get<string>('CLIENT_URL');
  }
}
