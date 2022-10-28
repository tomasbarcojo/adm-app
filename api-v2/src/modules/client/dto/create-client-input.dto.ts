import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString } from 'class-validator';

export class CreateClientInput {
  @ApiProperty({
    description: 'the name of the client',
    type: 'string',
    example: 'Arcor',
  })
  @Length(1, 255)
  @IsString()
  readonly businessName: string;

  @ApiProperty({
    description: 'the cuit of the client',
    type: 'string',
    example: '20-20202020-2',
  })
  @Length(1, 16)
  @IsString()
  readonly cuit: string;

  @ApiProperty({
    description: 'the phone number',
    type: 'string',
    example: '3426123123',
  })
  @Length(1, 20)
  @IsString()
  readonly phone: string;

  @ApiProperty({
    description: 'alternative phone',
    type: 'string',
    example: '3426123123',
  })
  @Length(1, 20)
  @IsString()
  readonly altPhone?: string;

  @ApiProperty({
    description: 'adress',
    type: 'string',
    example: 'Necochea 2556',
  })
  @Length(1, 255)
  @IsString()
  readonly address: string;

  @ApiProperty({
    description: 'city',
    type: 'string',
    example: 'Santa Fe',
  })
  @Length(1, 255)
  @IsString()
  readonly city: string;

  @ApiProperty({
    description: 'postal code',
    type: 'string',
    example: '3000',
  })
  @Length(1, 16)
  @IsString()
  readonly CP: string;
}
