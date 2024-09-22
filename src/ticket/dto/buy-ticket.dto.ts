import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import { TimeSlots } from '../ticket.entity';

export class BuyTicketDto {
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
