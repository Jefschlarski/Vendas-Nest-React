import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        
        private readonly cacheService: CacheService,
    ){};

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
}
