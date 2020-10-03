import { Module, HttpModule } from '@nestjs/common'
import { TechModel } from '@town/town.util/model.core';
import { TechController } from './tech.controller';
import { TechService } from './tech.service';

@Module({
  imports: [TechModel, HttpModule],
  controllers: [TechController],
  providers: [TechService]
})

export class TechModule { }