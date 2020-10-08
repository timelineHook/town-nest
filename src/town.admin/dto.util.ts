import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

// 用户列表

export class Login {
    @ApiProperty({example: '逃回学', description: '登录名'})
    @IsString()
    username: string;

    @ApiProperty({example: 'xxx', description: '用户密码'})
    @IsString()
    hexPassword: string;
}

export class QueryUser {
    @ApiProperty({ example: 1, description: '页码' })
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ApiProperty({ example: 10, description: '条数' })
    @Min(10)
    @IsNumber()
    @IsNotEmpty()
    limit: number

    @ApiProperty({ example: '张三', description: '姓名' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: '0879', description: '手机号' })
    @IsString()
    @IsOptional()
    mobile?: string;
}

export class CreateUser {
    @ApiProperty({ example: '张三', description: '姓名' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '0879', description: '工号' })
    @IsString()
    @IsNotEmpty()
    jobNumber: string;

    @ApiProperty({ example: '17319132392', description: '手机号' })
    @IsString()
    @IsNotEmpty()
    mobile: string;

    @ApiProperty({ example: 'xxx', description: '用户角色' })
    @IsString()
    @IsNotEmpty()
    role: string;

    @ApiProperty({ example: 'xxx', description: '头像' })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({ example: '逃回学', description: '用户登录名' })
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty({ example: 'xxxx', description: '登录密码' })
    @IsString()
    @IsOptional()
    hexPassword: string;
}

// 用户日志

export class QueryLog {
    @ApiProperty({ example: 1, description: '页码' })
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ApiProperty({ example: 10, description: '条数' })
    @Min(10)
    @IsNumber()
    @IsNotEmpty()
    limit: number

    @ApiProperty({ example: '逃回学', description: '姓名' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: '0879', description: '工号' })
    @IsString()
    @IsOptional()
    jobNumber?: string

    @ApiProperty({ example: ['2020-10-06 16:50', '2020-10-06 16:51'], description: '操作时间' })
    @IsArray()
    @IsOptional()
    operationTime?: string[];

    @ApiProperty({ example: '0879', description: '手机号' })
    @IsString()
    @IsOptional()
    mobile?: string;
}