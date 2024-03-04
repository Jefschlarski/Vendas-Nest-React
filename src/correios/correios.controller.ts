import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';

@Controller('correios')
export class CorreiosController {
    constructor(
        private readonly correiosService: CorreiosService
    ){}

    @Get('/:cep')
    findByCep(@Param('cep') cep: string)
    {
        return this.correiosService.findByCep(cep);
    }
}
