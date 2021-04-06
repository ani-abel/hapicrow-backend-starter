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
    Logger.log("Microservice is listening", "BaseApp");
  });
}
bootstrap();

