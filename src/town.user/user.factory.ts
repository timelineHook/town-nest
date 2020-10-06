import { Injectable } from "@nestjs/common";
import { EntityFactory } from "@town/town.util/abstract/factory.abstract";
import { UtilService as util } from "@town/town.util/town.util";
import { CreateEntity, UpdateEntity } from "@town/town.user/user.entity";
import { User } from "@town/town.user/user.schema";

@Injectable()
export class UserFactory implements EntityFactory {

    create(entity: CreateEntity): User {
        const _id = util.getRandomUUID();
        const time = util.getUtilDate();
        const user = new User();
        user._id = _id;
        user.area = '';
        user.city = '';
        user.country = '';
        user.createTime = time;
        user.hexPassword = entity.hexPassword;
        user.lockTime = '';
        user.loginTime = '';
        user.mobile = entity.mobile;
        user.name = '';
        user.province = '';
        user.updateTime = time;
        user.username = entity.username;
        return user;
    }

    update(entity: UpdateEntity): UpdateEntity{
        const time = util.getUtilDate();
        const user = new User();
        user.area = entity.area;
        user.city = entity.city;
        user.country = entity.country;
        user.hexPassword = entity.hexPassword;
        user.mobile = entity.mobile;
        user.name = entity.name;
        user.province = entity.province;
        user.updateTime = time;
        return user;
    }
}