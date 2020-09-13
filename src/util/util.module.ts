import { Module, HttpModule, Global } from '@nestjs/common'
import { UtilService} from './util';
import { MongooseModule } from '@nestjs/mongoose';
import { TechCrunchSchema, TechCrunchSchemaFactory } from 'src/tech/techCrunch.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: TechCrunchSchema.name, schema: TechCrunchSchemaFactory, collection: 'techCrunch' }], 'techCrunch'), HttpModule],
  providers: [UtilService],
  exports: [UtilService]
})

export class TechUtilModule { }