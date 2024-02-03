import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from '../city.service';
import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cityMock } from '../__mocks__/city.mock';
import { CacheService } from '../../cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<City>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      {
        provide:getRepositoryToken(City),
        useValue: {
          findOne: jest.fn().mockResolvedValue(cityMock),
        }
      }],
    }).compile();

    
    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<City>>(
      getRepositoryToken(City),
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  })

  it('should return City in getById', async () => {
    const city = await service.getById(cityMock.id);
    expect(city).toEqual(cityMock);
  })

  it('should return error in City getById', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.getById(cityMock.id)).rejects.toThrow(Error);
  })

  it('should return cities in getAllByState', async () => {
    const city = await service.getAllByState(cityMock.stateId);

    expect(city).toEqual([cityMock]);
  })
});
