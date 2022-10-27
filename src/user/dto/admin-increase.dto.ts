import { IsEmail, IsNumberString } from 'class-validator';

export class RightsChangeDTO {
  @IsNumberString()
  public code: number;
  @IsEmail()
  public email: string;
}
