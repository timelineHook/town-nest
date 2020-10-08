import { Module } from "@nestjs/common";
import { UserDB } from "@town/town.user/user.db";
import { AdminUserLogModel, AdminUserModel, UserModel } from "@town/town.util/town.model";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminUserLogDB } from "./database/log.db";
import { AdminUserDB } from "./database/user.db";

@Module({
    imports: [UserModel, AdminUserModel, AdminUserLogModel],
    controllers: [AdminController],
    providers: [AdminService, UserDB, AdminUserDB, AdminUserLogDB],
    exports: []
})
export class AdminModule { }