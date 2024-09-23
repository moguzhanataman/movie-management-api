import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { TicketService } from './ticket.service';
import { CustomerGuard } from '../auth/customer.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(CustomerGuard)
  @Post('buy')
  async buyTicket(@Body() buyTicketDto: BuyTicketDto) {
    await this.ticketService.buyTicket(1, buyTicketDto.movieSessionId);
    console.log({ buyTicketDto });
  }
}
