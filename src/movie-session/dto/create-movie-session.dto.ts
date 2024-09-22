import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import { TimeSlots } from 'src/_constants/time-slots';

export class CreateMovieSessionDto {
  @IsNotEmpty()
  movieId: number;

  @IsNotEmpty()
  room: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsIn(TimeSlots)
  timeSlot: string;
}
