import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, FilterQuery, Model } from "mongoose";
import { QueryUser } from "../dto.util";
import { pick } from 'lodash';
import { AdminUserLog } from "./log.schema";
import { UtilService } from "@town/town.util/town.util";

@Injectable()
export class AdminUserLogDB {
    constructor(
        @InjectModel(AdminUserLog.name)
        private readonly model: Model<AdminUserLog & Document>,
        private readonly util: UtilService
    ) {

    }

    public async query(condition: FilterQuery<QueryUser>, skip: number, limit: number) {
        const data = await this.model.find(condition, {}, { skip, limit, lean: true });
        return data;
    }

    public async count(condition){
        const data = await this.model.count(condition);
        return data;
    }

    public async create(data: AdminUserLog){
        const entity = {
            _id: this.util.getRandomUUID(),
            uid: data.uid,
            createTime: this.util.getUtilDate(),
            operation: data.operation,
            ip: data.ip,
            loginType: data.loginType
        }
        const result = await this.model.create(entity);
        return result;
    }
}