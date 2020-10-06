import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { User } from "./user.schema";

@Injectable()
export class UserDB {
    constructor(
        @InjectModel(User.name)
        private readonly model: Model<User & Document>
    ) {
    }

    public async findByName(username: string) {
        const data = await this.model.findOne({ username }).lean();
        return data;
    }

    public async create(user: User) {
        const data = await this.model.create(user);
        return data;
    }
}