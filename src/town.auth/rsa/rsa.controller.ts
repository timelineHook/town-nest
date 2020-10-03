import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RsaService } from './rsa.service';

@ApiTags('密钥配置中心')
@Controller('rsa')
export class RsaController {
  constructor(
    private readonly service: RsaService
  ) { }

  @ApiOperation({summary: '获取rsa密钥对'})
  @Post('get')
  async getRsaKeyPair() {
    const data = this.service.getRsaKeyPair();
    return data;
  }

}