import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TechCrunchSchema } from 'src/tech/techCrunch.schema';
import { Model, Document } from 'mongoose';
import { ITechCrunchBug } from 'src/interfaces/tech.crunch';
import * as moment from 'moment';
import * as uuid from 'uuid';
import { logger } from '../middleware/winston.middleware';
import * as _ from 'lodash';
import { UtilService } from '../util/util';
import { GetByPageDTO } from './tech.dto';
import constant from '../application/constant';
import * as fs from 'fs';

@Injectable()
export class TechService {

  private TechCrunchPage = 1;
  private readonly TECHCRUNCH = `https://techcrunch.com/wp-json/tc/v1/magazine?page=${this.TechCrunchPage}&_embed=true&cachePrevention=0`;

  constructor(
    @InjectModel(TechCrunchSchema.name) private techModel: Model<TechCrunchSchema & Document>,
    private readonly http: HttpService,
    private readonly techUtil: UtilService
  ) {

  }

  async getTechData(query: GetByPageDTO): Promise<TechCrunchSchema[]> {
    const { page, limit } = query;
    const intPage = parseInt(page);
    const intLimit = parseInt(limit);
    const skip = (intPage - 1) * intLimit;
    const data = await this.techModel.find({}, { content: 0 }).sort({ date: -1 }).skip(skip).limit(intLimit).lean<TechCrunchSchema>();
    data.forEach((v) => {
      const src = `${constant.techDir}/${v.imageSrc}`;
      if (fs.existsSync(src)) {
        v.imageSrc = fs.readFileSync(src).toString('base64')
      }
    });
    return data;
  }

  async bugTechCrunchData(): Promise<void> {
    try {
      // 获取tech  crunch数据
      const req = await this.http.get<ITechCrunchBug[]>(this.TECHCRUNCH,
        {
          timeout: 30000,
          timeoutErrorMessage: '连接超时'
        })
        .toPromise();

      // 获取核心数据
      const data = this.initTechCrunchData(req.data);
      await this.techModel
        .insertMany(data)
        .catch((e: Error) => logger.error(`bugTechCrunchData db fail`, e.message));

      // 组装数据
      this.TechCrunchPage += 1;
      logger.info(data.length.toString(), 'initTechCrunchData data size');
    } catch (e) {
      logger.error(`bugTechCrunchData fail`, e.message);
    }
  }

  // 初始化techcrunch数据
  private initTechCrunchData(data: ITechCrunchBug[]): TechCrunchSchema[] {
    const maps: TechCrunchSchema[] = data.map((v) => {
      return {
        _id: uuid.v4(),
        title: v?.title?.rendered,
        content: v?.content?.rendered,
        name: v?._embedded?.author[0]?.name,
        subtitle: v?.subtitle,
        imageSrc: v?.jetpack_featured_media_url,
        date: moment(v?.date).format("YYYY-MM-DD HH:mm"),
        text: v?.excerpt?.rendered,
        createTIme: this.techUtil.getUtilDate()
      }
    });

    const images = maps.map((v) => {
      const imageType = _.last(v.imageSrc.split('.'));
      const imageId = `${uuid.v4()}.${imageType}`;
      const condition = {
        url: v.imageSrc,
        _id: imageId
      };
      v.imageSrc = imageId;
      return condition;
    });

    for (const v of images) {
      this.techUtil.writeFIleImage(v);
    }

    return maps;
  }

  // 清空数据
  async clearTechBrunchData(): Promise<void> {
    try {
      const day = this.techUtil.getUtilDateStart();
      const condition = { createTIme: { $lte: day } };
      const [ data ] = await Promise.all([
        this.techModel
          .find(condition).lean(),
        this.techModel
          .remove(condition)
      ]);
      const ids = data.map((v) => v.imageSrc);
      ids.forEach((v) => {
        logger.info(`remove image => ${v}`);
        fs.unlink(`${constant.techDir}/${v}`, (e) => { logger.error(`remove image fail`, e.message); })
      });
    } catch (e) {
      logger.error(`clearTechBrunchData fail`, e.message);
    }
  }

}