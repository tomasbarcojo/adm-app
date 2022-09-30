import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginUserInput {
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