import { Injectable, HttpService } from "@nestjs/common";
import * as fs from 'fs';
import { logger } from "@town/middleware/winston.middleware";
import * as moment from 'moment';
import * as uuid from 'uuid';
import { rsa, tech } from "@town/application/constant";
import { CreateImageDTO } from "@town/town.util/validate/util.dto";

@Injectable()
export class UtilService {

  constructor(
    private readonly http: HttpService,
  ) {
  }

  // 图片写入
  async writeFIleImage(data: CreateImageDTO) {
    const req = await this.http.get(data.url, { responseType: 'stream' }).toPromise();
    const writeStream = fs.createWriteStream(`${tech.techDir}/${data._id}`);
    req.data.pipe(writeStream);
    writeStream.on('finish', () => {
      logger.info('文件下载完成', this.getUtilDate());
      writeStream.end();
    });
    writeStream.on('error', (e) => {
      logger.error('文件下载失败', e.message);
    });
  }

  // 获取当天日期 YYYY-M-DD hh:mm:ss
  getUtilDate() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  static getUtilDate() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  // 获取当天日期 YY-MM-DD 00:00:00
  getUtilDateStart() {
    const hour = '00:00:00';
    const day = `${moment().format('YYYY-MM-DD')} ${hour}`;
    return day;
  }

  static getUtilDateStart() {
    const hour = '00:00:00';
    const day = `${moment().format('YYYY-MM-DD')} ${hour}`;
    return day;
  }

  // 获取uuid v4 随机id
  getRandomUUID() {
    return uuid.v4();
  }

  static getRandomUUID() {
    return uuid.v4();
  }

  // base64 加密
  setEncryptBase64(text: string) {
    const encrypt = Buffer.from(text).toString('base64');
    return encrypt;
  }

  static setEncryptBase64(text: string) {
    const encrypt = Buffer.from(text).toString('base64');
    return encrypt;
  }

  // base64 解密
  setDecodeBase64(text: string) {
    const decode = Buffer.from(text, 'utf-8').toString();
    return decode;
  }

  static setDecodeBase64(text: string) {
    const decode = Buffer.from(text, 'utf-8').toString();
    return decode;
  }

}