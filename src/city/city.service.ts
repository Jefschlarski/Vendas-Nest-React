import { Inject, Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ){};

    async getAllByState(stateId: number): Promise<City[]>{
        const citiesCache: City[] = await this.cacheManager.get(`state_${stateId}`);

        if (citiesCache) {
            return citiesCache;
        }

        const cities = await this.cityRepository.find({
            where: {
                stateId: stateId
            }
        })

        await this.cacheManager.set(`state_${stateId}`, cities);

        return cities;
    }
}
