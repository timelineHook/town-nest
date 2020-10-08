import { Injectable } from "@nestjs/common";
import { UtilService } from "@town/town.util/town.util";
import { AdminUserDB } from "./database/user.db";
import { CreateUser, Login, QueryLog, QueryUser } from "./dto.util";
import { omit } from 'lodash';
import { TownException } from "@town/town.util/exception/app.exception";
import { MsgPool } from "@town/town.util/exception/app.msg";
import { redis } from "@town/town.redis/redis.client";
import { redis_config } from "@town/application/constant";
import { AdminUserLogDB } from "./database/log.db";
import { AdminSession } from "./admin.session";
import { AdminUserLog } from "./database/log.schema";

@Injectable()
export class AdminService {
    constructor(
        private readonly util: UtilService,
        private readonly adminUserDB: AdminUserDB,
        private readonly adminUserLogDB: AdminUserLogDB
    ) {

    }

    // 用户列表
    public async login(data: Login) {
        const user = await this.adminUserDB.findByUserName(data.username);

        if (!user) {
            throw TownException.of(MsgPool.user_no_found);
        }

        if (data.hexPassword !== user.hexPassword) {
            throw TownException.of(MsgPool.user_pass_invalid);
        }

        // 添加用户登录日志
        const operation = {
            _id: this.util.getRandomUUID(),
            createTime: this.util.getUtilDate(),
            operation: `${user.name} 登录`,
            ip: AdminSession.session.ip
        };
        await this.createLog(operation);
        const update = { loginTime: this.util.getUtilDate() };
        const result = await this.adminUserDB.findOneAndUpdate({ username: data.username }, update);
        const key = `${redis_config.user_flag}${user._id}`;
        await redis.set(key, JSON.stringify(user));
        await redis.expire(key, redis_config.user_expire);
        return result;
    }

    public async create(data: CreateUser) {

        const name = await this.adminUserDB.findByName(data.name);
        const username = await this.adminUserDB.findByUserName(data.username);
        if (name || username) {
            return { message: 'repeat' }
        }

        const operation = {
            _id: AdminSession.session._id,
            createTime: this.util.getUtilDate(),
            operation: `${AdminSession.session.name} 创建了用户 ${data.name}`,
            ip: AdminSession.session.ip
        };
        await this.createLog(operation);
        const time = this.util.getUtilDate();
        const _id = this.util.getRandomUUID();
        const entity = {
            _id,
            image: data.image ?? '',
            ...data,
            createTime: time,
            updateTime: time,
            loginTime: ''
        }
        await this.adminUserDB.create(entity);
        return entity;
    }

    public async query(data: QueryUser) {
        const operation = {
            _id: AdminSession.session._id,
            createTime: this.util.getUtilDate(),
            operation: `${AdminSession.session.name} 查询了用户`,
            ip: AdminSession.session.ip
        };
        await this.createLog(operation);
        const limit = 10;
        const skip = (data.page - 1) * limit;
        const condition = omit(data, ['page', 'limit']);
        const list = await this.adminUserDB.query(condition, skip, limit);
        const count = await this.adminUserDB.count();
        const result = {
            list,
            count
        }
        return result;
    }

    // 日志
    public async queryLog(data: QueryLog) {
        const limit = 10;
        const skip = (data.page - 1) * limit;
        const condition = omit(data, ['page', 'limit']);
        const result = await this.adminUserLogDB.query(condition, skip, limit);
        return result;
    }

    public async createLog(data: AdminUserLog) {
        const result = await this.adminUserLogDB.create(data);
        return result;
    }
}