    import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('CRM PLATFORM')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_ozodbek_swagger', app, document);
}