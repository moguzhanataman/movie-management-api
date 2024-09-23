import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteMovieDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  id: number;
}
