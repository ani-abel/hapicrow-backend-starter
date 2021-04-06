import { Module } from '@nestjs/common';
import { MicroserviceConnectorModule } from './microservice-connector/microservice-connector.module';
import { MicroserviceConnectorService } from './microservice-connector/microservice-connector.service';

@Module({
  controllers: [],
  providers: [MicroserviceConnectorService],
  exports: [MicroserviceConnectorModule],
  imports: [MicroserviceConnectorModule],
})
export class SchematicsModule { }
