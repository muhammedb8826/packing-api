import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });
  const globalPrefix = process.env.GLOBAL_PREFIX;
  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
}
bootstrap();
