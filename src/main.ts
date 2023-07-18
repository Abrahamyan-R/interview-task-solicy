import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Solicy test task')
    .setDescription('Solicy test task documentation')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {}
    });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const PORT = configService.get('app.port');

  app.enableCors()
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    disableErrorMessages: false,
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
    },
  }));

  configService.get('app.env') !== 'production' && initSwagger(app);

  await app.listen(PORT);

  console.log(`Application started on port ${PORT}`);
}

bootstrap();
