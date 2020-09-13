import { Module, HttpModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { TechCrunchSchema, TechCrunchSchemaFactory } from 'src/tech/techCrunch.schema';
import { TechController } from './tech.controller';
import { TechService } from './tech.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TechCrunchSchema.name, schema: TechCrunchSchemaFactory, collection: 'techCrunch' }], 'techCrunch'), HttpModule],
  controllers: [TechController],
  providers: [TechService]
})

export class TechModule { }