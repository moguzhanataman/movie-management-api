import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BuyTicketDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  movieSessionId: number;
}
