import { Module } from '@nestjs/common';
import { MicroserviceConnectorService } from './microservice-connector.service';

@Module({
  providers: [MicroserviceConnectorService],
  exports: [MicroserviceConnectorService],
})
export class MicroserviceConnectorModule { }
