import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JsonMaskInterceptor, HideObjectPropertyInterceptor } from '@hapicrow-backend-demo/interfaces';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: JsonMaskInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HideObjectPropertyInterceptor,
    },
    AppService
  ],
})
export class AppModule { }
