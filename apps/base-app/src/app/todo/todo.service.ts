import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoDTO, CreateTodoDTO, UpdateTodoDTO } from '@hapicrow-backend-demo/interfaces';
import { TodoDocument, Todo } from '../../schemas/todo.schema';
import { BaseService } from '../../utils/generics/BaseService.service';
import { CustomAPIType } from '../../utils/types/shared.types';
import { OperationType } from '../../utils/types/app.constants';
import { mapTodoToDTO } from './dto/todo.dto';

@Injectable()
export class TodoService extends BaseService<TodoDocument> {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {
    super(todoModel, TodoService.name);
    //? Inherit the same instance of logger object all over the app
    this.logger = this.getLogger();
  }

  async createTodo(payload: CreateTodoDTO): Promise<TodoDTO> {
    const createdTask: Todo = await this.create({ ...payload });
    return (mapTodoToDTO(createdTask) as TodoDTO); // Casting
  }

  async findTodos(): Promise<TodoDTO[]> {
    const tasks: Todo[] = await this.find();
    return (mapTodoToDTO(tasks) as TodoDTO[]);
  }

  async findTodoById(todoId: string): Promise<TodoDTO> {
    const task: Todo = await this.findOneById(todoId);
    return (mapTodoToDTO(task) as TodoDTO);
  }

  async deleteTodo(todoId: string): Promise<CustomAPIType> {
    await this.deleteOne({ _id: todoId });
    return {
      Message: "Deleted",
      OperationStatus: OperationType.SUCCESSFUL
    };
  }

  async updateTodo(payload: UpdateTodoDTO): Promise<CustomAPIType> {
    const { Id, Title, StartDate } = payload;
    const task: Todo = await this.findOneById(Id);
    if (task?._id) {
      if (Title && task.Title !== Title) {
        task.Title = Title;
      }
      if (StartDate && task.StartDate.getTime() !== StartDate.getTime()) {
        task.StartDate = StartDate;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedTask: any = {
        Title: task.Title,
        StartDate: task.StartDate
      };
      await this.getDocumentModel().updateOne({ _id: task._id }, { $set: updatedTask });
      return {
        Message: "Updated",
        OperationStatus: OperationType.SUCCESSFUL
      };
    }
  }
}
