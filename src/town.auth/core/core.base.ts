import * as bcrypt from 'bcryptjs';

export class CoreBase {
    
  // 使用 bcrypt进行密码加密
  encryptPassword(password: string) {
    const rounds = 10;
    const slat = bcrypt.genSaltSync(rounds);
    const hexPass = bcrypt.hashSync(password, slat);
    return hexPass;
  }

  // 校验用户密码
  async comparePassword(loginPass: string, userPass: string) {
    const isTure = await bcrypt.compare(loginPass, userPass);
    return isTure;
  }
}