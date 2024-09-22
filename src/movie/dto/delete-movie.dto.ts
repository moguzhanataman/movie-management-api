import { IsNotEmpty } from 'class-validator';

export class DeleteMovieDto {
  @IsNotEmpty()
  id: number;
}
