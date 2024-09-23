import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddMovieDto {
  @ApiProperty({ example: 'The Matrix' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 18 })
  @IsNotEmpty()
  ageRestriction: number;

  room: number;
  timeSlots: string[];
}
