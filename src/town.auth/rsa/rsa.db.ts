import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { Rsa } from "@town/town.auth/rsa/rsa.schema";

@Injectable()
export class RsaDB {
    constructor(
        @InjectModel(Rsa.name)
        private readonly model: Model<Rsa & Document>
    ) { }

    public async findOne() {
        const data = await this.model.findOne({}, { publicKey: 1, privateKey: 1 });
        return data;
    }

    public async create(entity: Rsa) {
        const data = await this.model.create(entity);
        return data;
    }
}