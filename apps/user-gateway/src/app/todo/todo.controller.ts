import { Controller, Get, Body, Post, Param, Delete, Patch } from '@nestjs/common';
import { DateCreatedPipe, TodoDTO, CreateTodoDTO, UpdateTodoDTO, CustomAPIType } from '@hapicrow-backend-demo/interfaces';
import { Observable } from 'rxjs';
import { ApiConsumes, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoSrv: TodoService) { }

  @ApiOperation({
    description: 'Create task',
  })
  @ApiProduces('json')
  @ApiConsumes('application/json')
  @ApiResponse({
    type: TodoDTO,
  })
  @Post("/create-todo")
  createTodo(@Body(new DateCreatedPipe()) payload: CreateTodoDTO): Observable<TodoDTO> {
    return this.todoSrv.createTodo(payload);
  }

  @ApiOperation({
    description: 'find tasks',
  })
  @ApiProduces('json')
  @ApiConsumes('application/json')
  @ApiResponse({
    type: [TodoDTO],
  })
  @Get("/find-todos")
  findTodos(): Observable<TodoDTO[]> {
    return this.todoSrv.findTodos();
  }

  @ApiOperation({
    description: 'find task by id',
  })
  @ApiProduces('json')
  @ApiConsumes('application/json')
  @ApiResponse({
    type: TodoDTO,
  })
  @Get("/find-todo-by-id/:todoId")
  findTodoById(@Param("todoId") todoId: string): Observable<TodoDTO> {
    return this.todoSrv.findTodoById(todoId);
  }

  @ApiOperation({
    description: 'delete task',
  })
  @ApiProduces('json')
  @ApiConsumes('application/json')
  @ApiResponse({
    type: CustomAPIType,
  })
  @Delete("/delete-todo/:todoId")
  deleteTodo(@Param("todoId") todoId: string): Observable<CustomAPIType> {
    return this.todoSrv.deleteTodo(todoId);
  }

  @ApiOperation({
    description: 'update a task',
  })
  @ApiProduces('json')
  @ApiConsumes('application/json')
  @ApiResponse({
    type: CustomAPIType,
  })
  @Patch("/update-todo")
  updateTodo(@Body(new DateCreatedPipe()) payload: UpdateTodoDTO): Observable<CustomAPIType> {
    return this.todoSrv.updateTodo(payload);
  }
}
