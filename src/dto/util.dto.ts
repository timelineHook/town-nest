import { IsString } from 'class-validator';

export class CreateImageDto {

  @IsString()
  readonly _id: string;

  @IsString()
  readonly url: string;

}