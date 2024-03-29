import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [AppModule.clientUrl, AppModule.browserClientUrl, '*'],
    credentials: true,
  });
  app.setGlobalPrefix('/api/v1');
  app.use(cookieParser());
  await app.listen(AppModule.port || 8000);
}
bootstrap();
