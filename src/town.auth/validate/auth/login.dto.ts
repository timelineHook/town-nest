import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBase64, IsMobilePhone } from 'class-validator';

export class UserLoginDTO {

    @ApiProperty({ example: '十年', description: '用户名' })
    @IsString()
    @IsNotEmpty()
    public readonly username: string;

    @ApiProperty({ example: 'xxxxxxx', description: '用户密码' })
    @IsBase64()
    public readonly password: string;

    @ApiProperty({ example: '17398734562', description: '用户手机号' })
    @IsMobilePhone()
    public readonly mobile?: string;

    @ApiProperty({ example: '17398734562@163.com', description: '用户邮箱' })
    @IsMobilePhone()
    public readonly email?: string;

}