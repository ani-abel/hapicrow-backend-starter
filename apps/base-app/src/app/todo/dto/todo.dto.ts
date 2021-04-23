/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Todo } from '../../../schemas/todo.schema';

export class CreateTodoDTO {
  @ApiProperty()
  Title: string;

  @ApiProperty()
  StartDate: Date;
}

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {
  @ApiProperty()
  Id: string;
}

export class TodoDTO {
  @ApiProperty()
  Id: string;

  @ApiProperty()
  Title: string;

  @ApiProperty()
  StartDate: Date;

  @ApiProperty()
  DateCreated: Date;
}

export const mapSingle = <T, U>(payload: T): U => {
  const keys = Object.keys(payload['_doc']);
  console.log({ keys, payload });
  const dto: any = {};
  for (const key of keys) {
    dto[key] = payload[key];
  }
  console.log({ dto });
  return (dto as U);
}

export const mapMultiple = <T, U>(schemas: T[]): U[] => {
  const dtos: any[] = [];
  for (const schema of schemas) {
    const keys = Object.keys(schema['_doc']);
    const dto: any = {};
    for (const key of keys) {
      dto[key] = schema[key];
    }
    dtos.push((dto as U));
  }
  return dtos;
}

export const mapTodoToDTO = (payload: Todo | Todo[]): TodoDTO | TodoDTO[] => {
  if (Array.isArray(payload)) {
    return payload.map((data) => {
      const { _id, Title, DateCreated, StartDate } = data;
      return {
        Id: _id,
        Title,
        DateCreated,
        StartDate
      }
    });
  }
  else {
    const { _id, Title, DateCreated, StartDate } = payload;
    return {
      Id: _id,
      Title,
      DateCreated,
      StartDate
    };
  }
}
