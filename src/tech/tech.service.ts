import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TechCrunch } from 'src/tech/techCrunch.schema';
import { Model } from 'mongoose';
import { ITechCrunch, ITechCrunchBug } from 'src/interfaces/tech.crunch';
import * as moment from 'moment';
import * as uuid from 'uuid';
import { LoggerService } from 'src/logger/logger.service';
import * as _ from 'lodash';
import { UtilService } from '../util/util';
import { GetByPageDTO } from './tech.dto';

@Injectable()
export class TechService {

  private TechCrunchPage = 1;
  private readonly TECHCRUNCH = `https://techcrunch.com/wp-json/tc/v1/magazine?page=${this.TechCrunchPage}&_embed=true&cachePrevention=0`;

  constructor(
    @InjectModel(TechCrunch.name) private techModel: Model<TechCrunch>,
    private readonly http: HttpService,
    private readonly logger: LoggerService,
    private readonly techUtil: UtilService
  ) { 
    this.logger.setContext('TechService');
  }

  async getTechData(query: GetByPageDTO): Promise<TechCrunch[]> {
    const {page, limit} = query;
    const intPage = parseInt(page);
    const intLimit = parseInt(limit ?? '20');
    const skip = intPage * intLimit;
    const data = await this.techModel.find().sort({date: -1}).skip(skip).limit(intLimit);
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
        .catch((e: Error) => {
          this.logger.error(`bugTechCrunchData fail`, e.message);
        });

      // 组装数据
      this.TechCrunchPage += 1;
      this.logger.info(data.length.toString(), 'initTechCrunchData data size');
    } catch (e) {
      this.logger.error(`bugTechCrunchData fail`, e.message);
    }
  }

  initTechCrunchData(data: ITechCrunchBug[]): ITechCrunch[] {
    const maps =  data. map((v) => {
      return {
        _id: uuid.v4(),
        title: v?.title?.rendered,
        content: v?.content?.rendered,
        name: v?._embedded?.author[0]?.name,
        subtitle: v?.subtitle,
        imageSrc: v?.jetpack_featured_media_url,
        date: moment(v?.date).format("YYYY-MM-DD HH:mm"),
        text: v?.excerpt?.rendered,
      }
    });

    const images = maps.map((v)=>{
      const imageType = _.last(v.imageSrc.split('.'));
      const imageId = `${uuid.v4()}.${imageType}`;
      const condition = {
        url: v.imageSrc,
        _id: imageId
      };
      return condition;
    });
    
    for (const v of images) {
      this.techUtil.writeFIleImage(v);
    }

    return maps;
  }

}