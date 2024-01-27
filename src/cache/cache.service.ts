import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
    
    constructor(
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ){};

    async getCache<T>(key: string, fun:() => Promise<T> ): Promise<T>{

        const cache: T = await this.cacheManager.get(key);

        if (cache) {
            return cache;
        }

        const data: T = await fun()

        await this.cacheManager.set(key, data);

        return data;
    }

}
