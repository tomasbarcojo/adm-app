import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';

export class CreateCategoryInput {
  @ApiProperty({
    description: 'the name of the category',
    type: 'string',
    example: 'Category 1',
  })
  @Length(1, 160)
  @IsString()
  readonly categoryName: string;

  @ApiProperty({
    description: 'the image of the product',
    type: 'string',
    example: '',
  })
  @Length(1, 255)
  @IsString()
  readonly image: string;
}
