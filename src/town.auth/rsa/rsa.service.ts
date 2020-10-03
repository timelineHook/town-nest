import { Injectable } from '@nestjs/common';
import { RsaBase } from './rsa.base';
import { RsaDB } from './rsa.db';
import { RsaFactory } from './rsa.factory';

@Injectable()
export class RsaService {

    constructor(
        private readonly rsaBase: RsaBase,
        private readonly db: RsaDB,
    ) { }

    // 设置mongo 密钥对 base64加密
    async setMongoRsaKeyPair(publicKey: string, privateKey: string) {
        const entity = new RsaFactory().create(publicKey, privateKey);
        const data = await this.db.create(entity);
        return data;
    }

    // 获取rsa 密钥对
    async getRsaKeyPair() {
        const data = await this.db.findOne();
        const pair = { publicKey: '', privateKey: '' };
        // 密钥存在则使用mongo中的密钥 否则重新生成密钥对并存储在mongo中
        if (data?.publicKey && data?.privateKey) {
            [pair.publicKey, pair.privateKey] = [data?.publicKey, data?.privateKey];
        } else {
            [pair.publicKey, pair.privateKey] = this.rsaBase.getRsaKeyPair();
            await this.setMongoRsaKeyPair(pair.publicKey, pair.privateKey);
        }
        return pair;
    }


}
