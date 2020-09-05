import { Controller, Get } from '@nestjs/common'
import { TechService } from './tech.service';
import { TechCrunch } from 'src/tech/techCrunch.schema';

@Controller('tech')
export class TechController {
  constructor(
    private readonly techService: TechService
  ) { }
  
  @Get('/getDbData')
  async getDbData(): Promise<TechCrunch>{
    return await this.techService.getTechData();
  }
}