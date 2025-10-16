import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/config/setup.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,               
  });
  await setupSwagger(app)
  await app.listen(process.env.PORT ?? 4000);
  console.log(`🚀 Server running on: http://localhost:${process.env.PORT ?? 4000}`);
}
bootstrap();
