import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDB } from '@town/town.user/user.db';
import { User } from '@town/town.user/user.schema';
import { pick } from "lodash";

@Injectable()
export class PPService {
    constructor(
        private readonly userDB: UserDB,
        private readonly jwtService: JwtService) { }

    // passport校验用户 如果用户合法 则返回用户对象 并在接下来的业务中使用req.user进行逻辑处理
    async validateUser(username: string, password: string) {
        const user = await this.userDB.findByName(username);
        if (user && user.hexPassword === password) {
            const { hexPassword, ...result } = user;
            return result;
        }
        return null;
    }

    // 创建用户登录token
    async createToken(user: User) {
        const entity = pick(user, ['_id']);
        const payload = entity;
        return { access_token: this.jwtService.sign(payload) };
    }
}
