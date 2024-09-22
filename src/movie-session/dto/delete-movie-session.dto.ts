import { IsNotEmpty } from 'class-validator';

export class DeleteMovieSessionDto {
  @IsNotEmpty()
  id: number;
}
