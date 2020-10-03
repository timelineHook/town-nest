import { Module, HttpModule, Global, HttpService } from '@nestjs/common'
import { UtilService } from './town.util';
import { MongooseModule } from '@nestjs/mongoose';
import { TechCrunch, TechCrunchSchema } from '@town/crawler.tech/techCrunch.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: TechCrunch.name, schema: TechCrunchSchema }]), HttpModule],
  providers: [UtilService],
  exports: [UtilService]
})

export class UtilModule { }