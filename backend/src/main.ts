import { NestApplication, NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.enableCors();

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(4000);
}
bootstrap();
