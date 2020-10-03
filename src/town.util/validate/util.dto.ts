import { IsString } from 'class-validator';

export class CreateImageDTO {

  @IsString()
  readonly _id: string;

  @IsString()
  readonly url: string;

}