import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { QueryUser } from "../dto.util";
import { AdminUser } from "./user.schema";
import { pick } from 'lodash';

@Injectable()
export class AdminUserDB {
    constructor(
        @InjectModel(AdminUser.name)
        private readonly model: Model<AdminUser & Document>
    ) {

    }

    public async findById(id: string) {
        const data = await this.model.findById(id, {}, { lean: true });
        return data;
    }

    public async findByName(name: string | RegExp) {
        const data = await this.model.findOne({ name }, {}, { lean: true });
        return data;
    }

    public async findByUserName(username: string) {
        const data = await this.model.findOne({ username }, {}, { lean: true });
        return data;
    }

    public async findOneAndUpdate(condition: Partial<AdminUser>, update: Partial<AdminUser>) {
        const data = await this.model.findOneAndUpdate(condition, update, { new: true });
        return data;
    }

    public async create(user: AdminUser) {
        const data = await this.model.create(user);
        return data;
    }

    public async query(condition: any, skip?: number, limit?: number) {
        const obj: any = {};

        if (condition.name) {
            obj.name = RegExp(condition.name);
        }

        if (condition.mobile) {
            obj.mobile = RegExp(condition.mobile);
        }

        if (condition.jobNumber) {
            obj.jobNumber = RegExp(condition.jobNumber);
        }

        skip = skip ?? 0;
        limit = limit ?? 10;
        const options: any = {};
        if (skip !== undefined) {
            options.skip = skip;
        }
        if (limit !== undefined) {
            options.limit = limit;
        }
        const data = await this.model.find(obj, {}, { sort: { createTime: -1 }, ...options, lean: true });
        return data;
    }

    public async count(condition?: Partial<QueryUser>) {
        const filter = pick(condition, ['name', 'mobile']);
        const data = await this.model.count(filter);
        return data;
    }
}