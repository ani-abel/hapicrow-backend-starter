import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MicroserviceConnectorModule, MicroserviceConnectorService } from '@hapicrow-backend-demo/schematics';

@Module({
  imports: [
    MicroserviceConnectorModule
  ],
  providers: [TodoService, MicroserviceConnectorService],
  controllers: [TodoController]
})
export class TodoModule { }
