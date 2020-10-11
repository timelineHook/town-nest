import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from './validate/redister.dto';

@ApiTags('用户中心')
@Controller('user')
export class UserController {

  constructor(private readonly service: UserService) {

  }

  @ApiOperation({ summary: '用户注册' })
  @Post('register')
  public async register(@Body() body: UserCreateDTO) {
    const data = await this.service.create(body);
    return data;
  }

}