import { Controller, Get, Query, Param, Res } from '@nestjs/common'
import { TechService } from './tech.service';
import { TechCrunch } from '@town/crawler.tech/techCrunch.schema';
import { GetByPageDTO } from './tech.dto';
import { Response} from 'express';

@Controller('tech')
export class TechController {
  constructor(
    private readonly techService: TechService
  ) { }
  
  @Get('get')
  async getDbData(@Query() query: GetByPageDTO): Promise<TechCrunch[]>{
    return await this.techService.getTechData(query);
  }

  @Get('get/src/:id')
  async getSrc(@Res() response: Response, @Param('id') id: string): Promise<void> {
    const data = this.techService.getSrcService(id);
    response.setHeader('Content-Type', 'image/jpeg;image/jpeg;image/png');
    response.writeHead(200, 'ok');
    response.write(data, 'binary');
    response.end();
  }

}