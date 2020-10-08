import { Injectable, CanActivate, ExecutionContext, Catch, UnauthorizedException } from '@nestjs/common';
import { redis_config } from '@town/application/constant';
import { redis } from '@town/town.redis/redis.client';
import { AdminSession } from './admin.session';

@Injectable()
export class AdminSessionGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const allow = ['/town/admin/login'];
    const token = request.headers.authorization;
    let user;
    let entity;
    // 校验是否需要检测session
    if (!allow.includes(request.originalUrl)) {
      // TODO 暂时使用用户id充当token进行校验
      user = await redis.get(`${redis_config.user_flag}${token}`);
      if (!user) {
        throw new UnauthorizedException();
      }

      entity = { ...JSON.parse(user), ip: request.ip };
    } else {
      entity = { ip: request.ip };
    }


    const deviceAgent = request.headers["user-agent"].toLowerCase();
    const agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if (agentID) {
      entity.loginType = 'mobile';
    } else {
      entity.loginType = 'pc';
    }
    AdminSession.session = entity;

    return true;
  }
}
