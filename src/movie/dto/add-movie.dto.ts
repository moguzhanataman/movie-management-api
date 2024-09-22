import { IsNotEmpty } from 'class-validator';

export class AddMovieDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ageRestriction: number;
}
