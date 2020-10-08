import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminSessionGuard } from "./admin.guard";
import { AdminService } from "./admin.service";
import { CreateUser, Login, QueryLog, QueryUser } from "./dto.util";

@ApiTags('后台管理')
@UseGuards(AdminSessionGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {

    }

    // 用户列表
    @ApiOperation({ summary: '登录' })
    @Post('login')
    async login(@Body() body: Login) {
        const data = await this.service.login(body);
        return data;
    }

    @ApiOperation({ summary: '创建用户' })
    @Post('create')
    async create(@Body() body: CreateUser) {
        const data = await this.service.create(body);
        return data;
    }

    @ApiOperation({ summary: '分页查询' })
    @Post('query')
    async query(@Body() body: QueryUser) {
        const data = await this.service.query(body);
        return data;
    }

    // 用户登录日志
    @ApiOperation({ summary: '查询日志' })
    @Post('log/query')
    async queryLog(@Body() body: QueryLog) {
        const data = await this.service.queryLog(body);
        return data;
    }

}