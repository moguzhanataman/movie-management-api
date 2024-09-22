import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import { TimeSlots } from 'src/_constants/time-slots';

export class BuyTicketDto {
  @IsNotEmpty()
  movieSessionId: number;
}
