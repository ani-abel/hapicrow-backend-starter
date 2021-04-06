import {
  Controller,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TodoService } from './todo.service';
import { CustomAPIType, TodoDTO, CreateTodoDTO, UpdateTodoDTO } from '@hapicrow-backend-demo/interfaces';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoSrv: TodoService
  ) { }

  @MessagePattern("create-todo")
  async createTodo(payload: CreateTodoDTO): Promise<TodoDTO> {
    return await this.todoSrv.createTodo(payload);
  }

  @MessagePattern("find-todos")
  async findTodos(): Promise<TodoDTO[]> {
    return await this.todoSrv.findTodos();
  }

  @MessagePattern('find-todo-by-todoId')
  async findTodoById(todoId: string): Promise<TodoDTO> {
    return await this.todoSrv.findTodoById(todoId);
  }

  @MessagePattern('delete-todo')
  async deleteTodo(todoId: string): Promise<CustomAPIType> {
    return await this.todoSrv.deleteTodo(todoId);
  }

  @MessagePattern("update-todo")
  async updateTodo(payload: UpdateTodoDTO): Promise<CustomAPIType> {
    return await this.todoSrv.updateTodo(payload);
  }
}
