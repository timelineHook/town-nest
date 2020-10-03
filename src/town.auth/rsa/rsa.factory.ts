import { EntityFactory } from "@town/town.util/abstract/factory.abstract";
import { UtilService as util } from "@town/town.util/town.util";
import { Rsa } from "@town/town.auth/rsa/rsa.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RsaFactory implements EntityFactory {

    create(publicKey: string, privateKey: string) {
        const time = util.getUtilDate();
        const entity = new Rsa();
        entity._id = 'system';
        entity.createTime = time;
        entity.updateTime = time;
        entity.publicKey = publicKey;
        entity.privateKey = privateKey;
        return entity;
    }

    update(publicKey: string, privateKey: string) {
        const time = util.getUtilDate();
        const entity = new Rsa();
        entity.updateTime = time;
        entity.publicKey = publicKey;
        entity.privateKey = privateKey;
        return entity;
    }
}