import { Injectable } from '@nestjs/common';
import { UserCreateDTO } from '@town/town.user/validate/redister.dto';
import { UserFactory } from '@town/town.user/user.factory';
import { RsaService } from '@town/town.auth/rsa/rsa.service';
import { UtilService } from '@town/town.util/town.util';
import { CoreBase } from '@town/town.auth/core/core.base';
import { RsaBase } from '@town/town.auth/rsa/rsa.base';
import { UserDB } from '@town/town.user/user.db';

@Injectable()
export class UserService {

  constructor(
    private readonly coreBase: CoreBase,
    private readonly rsaBase: RsaBase,
    private readonly rsaService: RsaService,
    private readonly util: UtilService,
    private readonly db: UserDB
  ) {
  }

  public async create(userCreateDTO: UserCreateDTO) {
    // 获取密钥对
    const { privateKey } = await this.rsaService.getRsaKeyPair();
    // 使用base64解密获取私钥
    const base64pk = this.util.setDecodeBase64(privateKey);
    // 使用私钥解密公钥获取明文密码
    const password = this.rsaBase.decodePublickKey(userCreateDTO.password, base64pk);
    // 获取加密的用户密码
    const hexPassword = this.coreBase.encryptPassword(password);
    // 编辑用户实体
    const entity = Object.assign(userCreateDTO, { hexPassword });
    const user = new UserFactory().create(entity);
    await this.db.create(user);

    // TODO redis 存储用户登录状态

    return user;
  }

}
