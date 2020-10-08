import { MongooseModule } from "@nestjs/mongoose";
import { mongodb_config } from "@town/application/constant";
import { TechCrunch, TechCrunchSchema } from "@town/crawler.tech/techCrunch.schema";
import { AdminUserLog, AdminUserLogSchema } from "@town/town.admin/database/log.schema";
import { AdminUser, AdminUserSchema } from "@town/town.admin/database/user.schema";
import { Rsa, RsaSchema } from "@town/town.auth/rsa/rsa.schema";
import { User, UserSchema } from "@town/town.user/user.schema";

// 主库
export const RsaModel = MongooseModule.forFeature([{ name: Rsa.name, schema: RsaSchema }]);
export const UserModel = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);
export const TechModel = MongooseModule.forFeature([{ name: TechCrunch.name, schema: TechCrunchSchema }]);

// 后台管理库
export const AdminUserModel = MongooseModule.forFeature([{ name: AdminUser.name, schema: AdminUserSchema }]);
export const AdminUserLogModel = MongooseModule.forFeature([{ name: AdminUserLog.name, schema: AdminUserLogSchema }]);