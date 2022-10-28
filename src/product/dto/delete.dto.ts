import { IsNumberString } from 'class-validator';

export class DeleteProductDTO {
  @IsNumberString()
  public id: number;
}
