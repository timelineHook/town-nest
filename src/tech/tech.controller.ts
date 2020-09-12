import { Controller, Get, Param, Query } from '@nestjs/common'
import { TechService } from './tech.service';
import { TechCrunch } from 'src/tech/techCrunch.schema';
import { GetByPageDTO } from './tech.dto';

@Controller('tech')
export class TechController {
  constructor(
    private readonly techService: TechService
  ) { }
  
  @Get('/get/tech/:page')
  async getDbData(@Query() query: GetByPageDTO): Promise<TechCrunch[]>{
    return await this.techService.getTechData(query);
  }
}