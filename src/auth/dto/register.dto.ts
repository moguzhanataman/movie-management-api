import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { UserTypes } from '../../_constants/user-types';

export class RegisterDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 25 })
  @IsNotEmpty()
  age: number;

  @ApiProperty({ example: 'manager' })
  @IsIn(Object.keys(UserTypes))
  userType: string;
}
