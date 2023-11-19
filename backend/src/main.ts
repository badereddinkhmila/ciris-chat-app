import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: AppModule.clientUrl,
  });
  app.setGlobalPrefix('/api/v1');
  await app.listen(AppModule.port || 8000);
}
bootstrap();
