import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserInput {
  @ApiProperty({
    description: 'the first name of the user',
    type: 'string',
    example: 'tomas',
  })
  @Length(1, 160)
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    description: 'the last name of the user',
    type: 'string',
    example: 'barcojo',
  })
  @Length(1, 160)
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    description: 'the last name of the user',
    type: 'string',
    example: 'barcojo',
  })
  @Length(1, 255)
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: 'the username of the user',
    type: 'string',
    example: 'tomasbarcojo',
  })
  @Length(1, 255)
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'the password of the user',
    type: 'string',
    example: '',
  })
  @Length(1, 255)
  @IsString()
  readonly password: string;
}