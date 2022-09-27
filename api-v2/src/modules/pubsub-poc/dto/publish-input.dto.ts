import { IsNumber, IsString, Length } from 'class-validator';

export class PublishInput {
  @Length(1, 160)
  @IsString()
  readonly message: string;

  @IsNumber()
  readonly value: number;
}
