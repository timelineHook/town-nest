import { Controller, Get, Query, HttpCode, Param, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto} from '../dto/user.dto';
import {UserGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { TestInterceptor } from 'src/interceptor/test.interceptor';
// import { User } from 'src/interfaces/user.interface';

@Controller('user')
export class UserController{

  constructor(private readonly userService: UserService) {
    
  }
  
  @Get('/getHello')
  @HttpCode(200)
  getUserHello(@Query() q: string): string {
    return this.userService.getUserHelloService(q);
  }
  
  @Get('/getHelloParam/:_id')
  @HttpCode(200)
  async getUserHelloParam(@Param() params: {_id: string}, @Query() q: string): Promise<string> {
    return this.userService.getUserHelloParamService(params, q);
  }

  @Post('/addUser')
  @HttpCode(200)
  @UseInterceptors(TestInterceptor)
  @Roles('admin', 'read')
  @UseGuards(UserGuard)
  async addUser(@Body() createrUserDto: CreateUserDto): Promise<CreateUserDto> {
    const condition = {
      name: createrUserDto.name,
      age: createrUserDto.age,
      address: createrUserDto.address,
      phone: createrUserDto.phone
    };
    return this.userService.addUser(condition);
  }

  // @Get('getUserById/:name')
  // @HttpCode(200)
  // async getUserById(@Param() params: { name: string }): Promise<User>{
  //   return this.userService.getUser(params.name)
  // }

}