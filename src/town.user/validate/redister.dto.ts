import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBase64, IsMobilePhone } from 'class-validator';

export class UserCreateDTO {

    @ApiProperty({ example: '十年', description: '用户名' })
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: 'xxxxxxx', description: '用户密码' })
    @IsBase64()
    readonly password: string;

    @ApiProperty({ example: '17398734562', description: '用户手机号' })
    @IsMobilePhone()
    readonly mobile: string;



}