import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Employee Registry')
    .setDescription('Employee Registry API description')
    .setVersion('1.0')
    .addTag('employees')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
