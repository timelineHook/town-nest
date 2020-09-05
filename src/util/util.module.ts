import { Module, HttpModule, Global } from '@nestjs/common'
import { UtilService} from './util';
import { MongooseModule } from '@nestjs/mongoose';
import { TechCrunch, TechDbSchema } from 'src/tech/techCrunch.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: TechCrunch.name, schema: TechDbSchema, collection: 'techCrunch' }], 'techCrunch'), HttpModule],
  providers: [UtilService],
  exports: [UtilService]
})

export class TechUtilModule { }