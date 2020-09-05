import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user.dto';
// import { Model } from 'mongoose';
// import { User } from 'src/interfaces/user.interface'

@Injectable()
export class UserService {

  // constructor(
  //   // @Inject('USER_MODEL')
  //   // private readonly userModel: Model<User>
  // ) {
  // }

  getUserHelloService(q: string): string {
    return `request str = ${JSON.stringify(q)}`;
  }

  async getUserHelloParamService(param: { _id: string }, q: string): Promise<string> {
    console.log(param, q);
    return `request _id = ${param._id},  q = ${q}`;
  }

  async addUser(param: CreateUserDto): Promise<CreateUserDto> {
    return param;
  }

  // async getUser(name: string): Promise<User> {
  //   const data = await this.userModel.findOne({ displayName: name });
  //   return data;
  // }

}
