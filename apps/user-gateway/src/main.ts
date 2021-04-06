/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HideObjectPropertyInterceptor, JsonMaskInterceptor } from '@hapicrow-backend-demo/interfaces';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const apiDescription = `HAPICROW API`;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('HAPICROW API')
    .setDescription(apiDescription)
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, doc)
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });

  app.use(helmet());
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  //? Remove any unwanted fields from any reponse sent back to the frontend
  app.useGlobalInterceptors(new HideObjectPropertyInterceptor());
  //?- Trigger partial response inteceptor(Runs Json-Mask) before sending back each request
  app.useGlobalInterceptors(new JsonMaskInterceptor());
  app.enableCors();


}

bootstrap();
