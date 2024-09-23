import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'The Matrix 2' })
  name: string;

  @ApiProperty({ example: 13 })
  ageRestriction: number;
}
