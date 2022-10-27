import { IsEmail, IsNumber, IsNumberString } from 'class-validator';

export class SendTokensDTO {
  @IsEmail()
  public email: string;
  @IsNumberString()
  public amount: number;
}
