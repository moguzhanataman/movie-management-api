import { Body, Controller, Logger, Post } from '@nestjs/common';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('buy')
  async buyTicket(@Body() buyTicketDto: BuyTicketDto) {
    await this.ticketService.buyTicket(
      1,
      buyTicketDto.movieId,
      buyTicketDto.room,
      buyTicketDto.date,
      buyTicketDto.timeSlot,
    );
  }
}
