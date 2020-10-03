import { Module } from "@nestjs/common";
import { UserDB } from "@town/town.user/user.db";
import { CoreContorller } from "./core/core.controller";
import { CoreModule } from "./core/core.module";
import { CoreService } from "./core/core.service";
import { RsaController } from "./rsa/rsa.controller";
import { RsaModule } from "./rsa/rsa.module";
import { RsaService } from "./rsa/rsa.service";

const multi = [CoreModule, RsaModule];

@Module({
    imports: multi,
    controllers: [CoreContorller, RsaController],
    providers: [CoreService, RsaService, UserDB],
})
export class AuthModule { }