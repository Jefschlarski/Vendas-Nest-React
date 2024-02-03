import { Controller, Get, Param } from '@nestjs/common';     
import { City } from './entities/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService){};
    
    /**
     * Get all cities by state ID.
     *
     * @param {number} stateId - The ID of the state
     * @return {Promise<City[]>} A promise that resolves with an array of cities
     */
    @Get('/:stateId')
    async getAllByState(@Param('stateId') stateId: number): Promise<City[]>{
        return this.cityService.getAllByState(stateId);
    }

}
