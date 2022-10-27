import { IsEmail } from 'class-validator';

export class QueryDto {
  @IsEmail()
  public email: string;
}
