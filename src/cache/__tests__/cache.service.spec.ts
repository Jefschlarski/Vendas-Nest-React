import { Test, TestingModule } from '@nestjs/testing';
import { userMock } from '../../user/__mocks__/user_mock';
import { CacheService } from '../cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue:{
            get: () => userMock,
            set: () => jest.fn(),
          },
        },
        ],
    }).compile();

    
    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should return data in cache', async () => {
    const user = await service.getCache('key', ()=> null)
    expect(user).toEqual(userMock);
  })

  it('should return data in function', async () => {
    const result = { test: 'teste' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined);

    const user = await service.getCache('key', ()=> Promise.resolve(result))
    expect(user).toEqual(result);
  })
});
