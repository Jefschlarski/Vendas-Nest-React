import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
    
    constructor(
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ){};
    
    /**
     * Asynchronous function to get a value from cache or compute it using the provided function and store in cache.
     *
     * @param {string} key - The key for the cache entry.
     * @param {() => Promise<T>} fun - The function to compute the value if not found in cache.
     * @return {Promise<T>} The value from the cache or the computed value.
     */
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
