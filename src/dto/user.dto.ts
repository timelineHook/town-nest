import {IsString, IsInt, IsArray } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;
  
  @IsString()
  readonly address: string;

  @IsArray()
  readonly phone: Array<Record<'tel' | 'memo', string>>
}