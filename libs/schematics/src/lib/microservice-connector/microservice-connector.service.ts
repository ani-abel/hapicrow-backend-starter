import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from "@nestjs/microservices";

@Injectable()
export class MicroserviceConnectorService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: "redis://localhost:6379"
      }
    });
  }

  getClient(): ClientProxy {
    return this.client;
  }
}
