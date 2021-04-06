/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import { Logger } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';

// import { AppModule } from './app/app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);
//   const port = process.env.PORT || 3333;
//   await app.listen(port, () => {
//     Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
//   });
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { Transport, ClientOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

const microservicesOptions: ClientOptions = {
  transport: Transport.REDIS,
  options: {
    url: "redis://localhost:6379"
  }
};

async function bootstrap() {
  const app = NestFactory.createMicroservice(AppModule, microservicesOptions);
  (await app).listen(() => {
    Logger.log("Microservice is listening", "Main");
  });
}
bootstrap();

