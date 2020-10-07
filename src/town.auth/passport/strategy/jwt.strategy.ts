import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwt_config } from '@town/application/constant';
import { User } from '@town/town.user/user.schema';

// jwt 策略
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 提供从请求中提取 JWT 的方法
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwt_config.secret,
    });
  }

  async validate(payload: Omit<User, 'hexPassword'>) {
    return payload;
  }
}
