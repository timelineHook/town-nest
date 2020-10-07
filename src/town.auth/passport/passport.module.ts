import { Module } from "@nestjs/common";
import { PPService } from "@town/town.auth/passport/passport.service";
import { PPController } from "@town/town.auth/passport/passport.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwt_config } from "@town/application/constant";
import { UserModel } from "@town/town.util/town.model";
import { UserDB } from "@town/town.user/user.db";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register(jwt_config),
        UserModel
    ],
    controllers: [PPController],
    providers: [PPService, UserDB, LocalStrategy, JwtStrategy]
})

export class PPModule { }