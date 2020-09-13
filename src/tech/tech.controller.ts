import { Controller, Get, Query } from '@nestjs/common'
import { TechService } from './tech.service';
import { TechCrunchSchema } from 'src/tech/techCrunch.schema';
import { GetByPageDTO } from './tech.dto';

@Controller('tech')
export class TechController {
  constructor(
    private readonly techService: TechService
  ) { }
  
  @Get('get')
  async getDbData(@Query() query: GetByPageDTO): Promise<TechCrunchSchema[]>{
    return await this.techService.getTechData(query);
  }
}