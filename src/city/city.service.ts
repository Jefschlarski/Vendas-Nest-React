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
