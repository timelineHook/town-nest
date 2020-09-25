import { Injectable, HttpService } from "@nestjs/common";
import * as fs from 'fs';
import { CreateImageDto } from "src/dto/util.dto";
import { logger } from "../middleware/winston.middleware";
import * as moment from 'moment';
import * as uuid from 'uuid';

@Injectable()
export class UtilService {

  constructor(
    private readonly http: HttpService,
  ) {
  }

  private readonly techDir = `/tmp/nest/tech/img`;

  // 图片写入
  async writeFIleImage(data: CreateImageDto): Promise<void> {
    const req = await this.http.get(data.url, { responseType: 'stream' }).toPromise();
    const writeStream = fs.createWriteStream(`${this.techDir}/${data._id}`);
    req.data.pipe(writeStream);
    writeStream.on('finish', (v) => {
      logger.info('文件下载完成', this.getUtilDate());
      writeStream.end();
    });
    writeStream.on('error', (e) => {
      logger.error('文件下载失败', e.message);
    });
  }

  // 获取当天日期 YYYY-MM-DD hh:mm:ss
  getUtilDate(): string {
    return moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
  }

  // 获取当天日期 YY-MM-DD 00:00:00
  getUtilDateStart(): string {
    const hour = '00:00:00';
    const day = `${moment().locale('zh-cn').format('YYYY-MM-DD')} ${hour}`;
    return day;
  }

  // 获取uuid v4 随机id
  getRandomUUID(): string {
    return uuid.v4();
  }

}