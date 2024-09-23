import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import { TimeSlots } from '../../_constants/time-slots';

const currentDateExample = new Date().toISOString().split('T')[0];

export class CreateMovieSessionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  movieId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  room: number;

  @ApiProperty({ example: currentDateExample })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ example: TimeSlots[0] })
  @IsIn(TimeSlots)
  timeSlot: string;
}
