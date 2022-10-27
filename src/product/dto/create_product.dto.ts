import { IsNumberString, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  public title: string;
  @IsNumberString()
  public price;
  @IsNumberString()
  public qty: number;
}
