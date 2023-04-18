import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5090);
  console.log('Server is listening on: http://localhost:5090');
}
bootstrap();
