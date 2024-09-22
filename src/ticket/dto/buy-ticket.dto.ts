import { IsNotEmpty } from 'class-validator';

export class BuyTicketDto {
  @IsNotEmpty()
  movieSessionId: number;
}
