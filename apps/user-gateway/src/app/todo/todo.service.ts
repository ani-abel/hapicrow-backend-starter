import { Injectable } from '@nestjs/common';
import { MicroserviceConnectorService } from '@hapicrow-backend-demo/schematics';
import { TodoDTO, CreateTodoDTO, UpdateTodoDTO, CustomAPIType } from '@hapicrow-backend-demo/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService extends MicroserviceConnectorService {

  createTodo(payload: CreateTodoDTO): Observable<TodoDTO> {
    return this.getClient().send("create-todo", payload);
  }

  findTodos(): Observable<TodoDTO[]> {
    return this.getClient().send("find-todos", {});
  }

  findTodoById(todoId: string): Observable<TodoDTO> {
    return this.getClient().send("find-todo-by-todoId", todoId);
  }

  deleteTodo(todoId: string): Observable<CustomAPIType> {
    return this.getClient().send("delete-todo", todoId);
  }

  updateTodo(payload: UpdateTodoDTO): Observable<CustomAPIType> {
    return this.getClient().send("update-todo", payload);
  }
}
