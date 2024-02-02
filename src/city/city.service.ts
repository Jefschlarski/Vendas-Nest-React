import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        
        private readonly cacheService: CacheService,
    ){};

    /**
     * Retrieves all cities by state ID from the cache or database.
     *
     * @param {number} stateId - The ID of the state to retrieve cities for
     * @return {Promise<City[]>} A promise that resolves to an array of City objects
     */
    async getAllByState(stateId: number): Promise<City[]>{
        return this.cacheService.getCache<City[]>
            (
                `state_${stateId}`, 
            
                ()=> this.cityRepository.find({
                    where: {
                        stateId: stateId
                    }
                }),

            )
    }
    
    /**
     * Retrieves a city by its ID.
     *
     * @param {number} cityId - the ID of the city to retrieve
     * @return {Promise<City>} the city object
     */
    async getById(cityId: number): Promise<City>{

        const city = await this.cityRepository.findOne({
            where:{
                id:cityId
            }
        })
        
        if(!city){
            throw new NotFoundException(`cityId ${cityId} Not Found`)
        }

        return city;
    }
}
