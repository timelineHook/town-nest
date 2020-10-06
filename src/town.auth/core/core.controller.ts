import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserLoginDTO } from "@town/town.auth/validate/auth/login.dto";
import { CoreService } from "@town/town.auth/core/core.service";

@ApiTags('认证中心')
@Controller('auth')
export class CoreContorller {
    constructor(
        private readonly service: CoreService
    ) { }

    @ApiOperation({ summary: '用户登录' })
    @Post('login')
    async login(@Body() body: UserLoginDTO) {
        const data = await this.service.loginService(body);
        return data;
    }
}