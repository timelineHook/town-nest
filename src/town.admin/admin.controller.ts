import { Body, Controller, Get, Param, Post, Res, ServiceUnavailableException, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TownException } from "@town/town.util/exception/app.exception";
import { MsgPool } from "@town/town.util/exception/app.msg";
import { Response } from "express";
import { omit } from "lodash";
import { AdminSessionGuard } from "./admin.guard";
import { AdminService } from "./admin.service";
import { CreateUser, GetUserById, Login, QueryLog, QueryUser } from "./dto.util";

@ApiTags('后台管理')
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {

    }

    // 个人新洗
    @ApiOperation({ summary: '个人信息' })
    @UseGuards(AdminSessionGuard)
    @Get('get/:id')
    async get(@Param() params: GetUserById) {
        const data = await this.service.findById(params.id);
        return data;
    }

    // 用户列表
    @ApiOperation({ summary: '登录' })
    @UseGuards(AdminSessionGuard)
    @Post('login')
    async login(@Body() body: Login) {
        const data = await this.service.login(body);
        return data;
    }

    @ApiOperation({ summary: '创建用户' })
    @UseGuards(AdminSessionGuard)
    @Post('create')
    async create(@Body() body: CreateUser) {
        const data = await this.service.create(body);
        return data;
    }

    @ApiOperation({ summary: '分页查询' })
    @UseGuards(AdminSessionGuard)
    @Post('query')
    async query(@Body() body: QueryUser) {
        const data = await this.service.query(body);
        return data;
    }

    // 用户登录日志
    @ApiOperation({ summary: '查询日志' })
    @UseGuards(AdminSessionGuard)
    @Post('log/query')
    async queryLog(@Body() body: QueryLog) {
        const data = await this.service.queryLog(body);
        return data;
    }

    // 上传头像
    @ApiOperation({ summary: '用户头像上传' })
    @UseGuards(AdminSessionGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload/avatar')
    public async uploadAvatar(@UploadedFile() file) {
        const type = ["image/jpeg", "image/jpg", "image/png"];
        const isImg = type.includes(file.mimetype);
        if (!isImg) {
            throw TownException.of(MsgPool.avatar_must_picture);;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            throw TownException.of(MsgPool.avatar_must_less_than_2m);
        }
        await this.service.uploadAvatar(file);
        return true;
    }

    @Get('get/src/:id')
    async getSrc(@Res() response: Response, @Param('id') id: string): Promise<void> {
        const data = this.service.getSrcService(id);
        response.setHeader('Content-Type', 'image/jpeg;image/jpeg;image/png');
        response.writeHead(200, 'ok');
        response.write(data, 'binary');
        response.end();
    }

}