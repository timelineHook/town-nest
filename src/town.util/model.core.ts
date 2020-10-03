import { MongooseModule } from "@nestjs/mongoose";
import { TechCrunch, TechCrunchSchema } from "@town/crawler.tech/techCrunch.schema";
import { Rsa, RsaSchema } from "@town/town.auth/rsa/rsa.schema";
import { User, UserSchema } from "@town/town.user/user.schema";

export const RsaModel = MongooseModule.forFeature([{ name: Rsa.name, schema: RsaSchema }]);
export const UserModel = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);
export const TechModel =  MongooseModule.forFeature([{ name: TechCrunch.name, schema: TechCrunchSchema }]);