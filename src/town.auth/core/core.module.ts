import { Module } from "@nestjs/common";
import { CoreContorller } from "@town/town.auth/core/core.controller";
import { CoreService } from "@town/town.auth/core/core.service";
import { UserDB } from "@town/town.user/user.db";
import { UserModel } from "@town/town.util/town.model";
import { RsaModule } from "../rsa/rsa.module";
import { CoreBase } from "./core.base";

@Module({
    imports: [RsaModule, UserModel],
    controllers: [CoreContorller],
    providers: [CoreService, CoreBase, UserDB],
    exports: [UserModel, CoreService, CoreBase, UserDB]
})
export class CoreModule { }