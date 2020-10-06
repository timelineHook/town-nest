import { Injectable } from "@nestjs/common";
import { UserDB } from "@town/town.user/user.db";
import { UserLoginDTO } from "@town/town.auth/validate/auth/login.dto";
import { RsaService } from "../rsa/rsa.service";
import { UtilService } from "@town/town.util/town.util";
import { TownException } from "@town/town.util/exception/app.exception";
import { MsgPool } from '@town/town.util/exception/app.msg';
import { RsaBase } from "@town/town.auth/rsa/rsa.base";
import { CoreBase } from "@town/town.auth/core/core.base";
import { redis } from "@town/town.redis/redis.client";
import { redis_config } from "@town/application/constant";

@Injectable()
export class CoreService {
    constructor(
        private readonly userDB: UserDB,
        private readonly coreBase: CoreBase,
        private readonly rsaBase: RsaBase,
        private readonly rsaService: RsaService,
        private readonly util: UtilService,
    ) { }

    public async loginService(data: UserLoginDTO) {
        // 获取私钥
        const { privateKey } = await this.rsaService.getRsaKeyPair();
        // 解密base64 获取私钥
        const base64PK = this.util.setDecodeBase64(privateKey);
        // 使用私钥解密公钥 获取密码明文
        const frontPass = this.rsaBase.decodePublickKey(data.password, base64PK);
        // 获取用户密码
        const user = await this.userDB.findByName(data.username);

        if (!user) {
            throw TownException.of(MsgPool.user_no_found);
        }

        // 比较用户密码
        const isTrue = this.coreBase.comparePassword(frontPass, user.hexPassword);

        if (!isTrue) {
            throw TownException.of(MsgPool.user_pass_invalid);
        }

        // 存储登录状态在redis中
        const key = `${redis_config.user_flag}${user._id}`;
        await redis.set(key, JSON.stringify(user));
        await redis.expire(key, redis_config.user_expire);
        return user;
    }
}