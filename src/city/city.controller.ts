import { Controller, Get, Param } from '@nestjs/common';     
import { City } from './entities/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService){};

    @Get('/:stateId')
    async getAllByState(@Param('stateId') stateId: number): Promise<City[]>{
        return this.cityService.getAllByState(stateId);
    }

}
