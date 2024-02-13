import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../address.service';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheService } from '../../cache/cache.service';
import { addressMock } from '../__mocks__/address.mock';
import { UserService } from '../../user/user.service';
import { userMock } from '../../user/__mocks__/user_mock';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { addressDtoMock } from '../__mocks__/address.dto.mock';
import { NotFoundException } from '@nestjs/common';

describe('AddressService', () => {
  let service: AddressService;
  let userService: UserService;
  let cityService: CityService;
  let addressRepository: Repository<Address>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue:{
            findById: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: CityService,
          useValue:{
            getById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([addressMock]),
          },
        },
        {
          provide:getRepositoryToken(Address),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          }
        },
      ],
    }).compile();

    
    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityService).toBeDefined();
    expect(userService).toBeDefined();
    expect(addressRepository).toBeDefined();
  })

  it('should return Address after save', async () => {
    const address = await service.create(addressDtoMock, addressMock.id);
    expect(address).toEqual(addressMock);
  })

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findById').mockRejectedValueOnce(new Error());

    expect(service.create(addressMock, userMock.id)).rejects.toThrow(Error);
  })

  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'getById').mockRejectedValueOnce(new Error());

    expect(service.create(addressMock, userMock.id)).rejects.toThrow(Error);
  })

  it('should return all address in findAllByUserId', async () => {
    const addresses = await service.findAllByUserId(userMock.id);
    expect(addresses).toEqual([addressMock]);
  })

  it('should return notfound in findAllByUserId', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValueOnce(undefined);
    expect(service.findAllByUserId(userMock.id)).rejects.toThrow(NotFoundException);
  })
});
