import { ApiProperty, PartialType } from '@nestjs/swagger';

export enum OperationType {
  FAILED = "FAILED",
  SUCCESSFUL = "SUCCESSFUL"
}

export class CustomAPIType {
  @ApiProperty()
  Message: string;

  @ApiProperty({
    enum: OperationType,
  })
  OperationStatus: OperationType;

  @ApiProperty({
    nullable: true
  })
  CustomIdentifier?: string;
}

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
