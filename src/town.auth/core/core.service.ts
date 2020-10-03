import { Injectable } from "@nestjs/common";
import { UserDB } from "@town/town.user/user.db";
import { UserLoginDTO } from "@town/town.auth/validate/auth/login.dto";
import { RsaService } from "../rsa/rsa.service";
import { UtilService } from "@town/town.util/town.util";
import { TownException } from "@town/town.util/exception/app.exception";
import { MsgPool } from '@town/town.util/exception/app.msg';
import { RsaBase } from "../rsa/rsa.base";
import { CoreBase } from "./core.base";

@Injectable()
export class CoreService {
    constructor(
        private readonly userDB: UserDB,
        private readonly coreBase: CoreBase,
        private readonly rsaBase: RsaBase,
        private readonly rsaService: RsaService,
        private readonly util: UtilService
    ) { }

    public async loginService(data: UserLoginDTO) {
        // 获取私钥
        const { privateKey } = await this.rsaService.getRsaKeyPair();
        // 解密base64 获取私钥
        const encodePublickKey = this.util.setDecodeBase64(data.password);
        // 使用私钥解密公钥 获取密码明文
        const frontPass = this.rsaBase.decodePublickKey(encodePublickKey, privateKey);
        // 获取用户密码
        const user = await this.userDB.findByName(data.username);

        if (!user) {
            throw TownException.of(MsgPool.user_no_found);
        }

        // 比较用户密码
        const isTrue = this.coreBase.comparePassword(frontPass, user.hexPassword);

        if(!isTrue){
            throw TownException.of(MsgPool.user_pass_invalid);
        }

        // TODO 存储登录状态在redis中

        return user;
    }
}