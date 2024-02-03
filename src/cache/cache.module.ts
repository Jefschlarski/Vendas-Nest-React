import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CM } from '@nestjs/cache-manager';

@Module({
  imports: [CM.register({ttl: 4000000})],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
