import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  id: number;

  name: string;
  ageRestriction: number;
}
