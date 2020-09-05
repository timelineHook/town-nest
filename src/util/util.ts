import { Injectable, HttpService } from "@nestjs/common";
import * as fs from 'fs';
import { CreateImageDto } from "src/dto/util.dto";
import { LoggerService } from "src/logger/logger.service";
import * as moment from 'moment';
import * as uuid from 'uuid';

@Injectable()
export class UtilService {

  constructor(
    private readonly http: HttpService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext('TechUtilService');
  }

  private readonly TECHDIR = `/home/zzw/MySelfGitHUb/nest-pro-bug/public/image/tech.crunch`;

   // 图片写入
  async writeFIleImage(data: CreateImageDto): Promise<void> {
    const req = await this.http.get(data.url, { responseType: 'stream'}).toPromise();
    const writeStream = fs.createWriteStream(`${this.TECHDIR}/${data._id}`);
    req.data.pipe(writeStream);
    writeStream.on('finish', (v) => {
      this.logger.info('文件下载完成', this.getUtilDate());
      writeStream.end();
    });
    writeStream.on('error', (e) => {
      this.logger.error('文件下载失败', e.message);
    });
  }

  // 获取当天日期 YYYY-M-DD hh:mm:ss
  getUtilDate(): string{
    return moment().format('YYYY-MM-DD hh:mm:ss');
  }

  // 获取uuid v4 随机id
  getRandomUUID(): string{
    return uuid.v4();
  }

}