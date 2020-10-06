import { Module } from '@nestjs/common';
import { AuthModule } from '@town/town.auth/auth.module';
import { CoreModule } from '@town/town.auth/core/core.module';
import { RsaModule } from '@town/town.auth/rsa/rsa.module';
import { UserModel } from '@town/town.util/town.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule, UserModel, CoreModule, RsaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }