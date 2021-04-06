import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment as env } from '../environments/environment';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';

export enum NODE_ENVIRONMENT {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

const { dbConnection: { DATABASE_URL } } = env;

@Module({
  imports: [
    MongooseModule.forRoot(
      DATABASE_URL,
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    ),
    TodoModule,
  ],
  controllers: [AppController],
  //providers: [AppService, TodoService],
  providers: [AppService],
})
export class AppModule { }
