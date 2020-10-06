import { Module } from '@nestjs/common'
import { RsaController } from '@town/town.auth/rsa/rsa.controller';
import { RsaService } from '@town/town.auth/rsa/rsa.service';
import { RsaModel } from '@town/town.util/town.model';
import { RsaBase } from './rsa.base';
import { RsaDB } from './rsa.db';

const multi = [RsaService, RsaBase, RsaDB];

@Module({
    imports: [RsaModel],
    controllers: [RsaController],
    providers: multi,
    exports: [RsaModel, ...multi]
})

export class RsaModule { }