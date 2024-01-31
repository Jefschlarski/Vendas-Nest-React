import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userMock } from '../__mocks__/user_mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { userDtoMock } from '../__mocks__/user_dto_mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
      {
        provide:getRepositoryToken(User),
        useValue: {
          findOne: jest.fn().mockResolvedValue(userMock),
          save: jest.fn().mockResolvedValue(userMock),
        }
      }],
    }).compile();

    
    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(
      getRepositoryToken(User),
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in getById', async () => {
    const user = await service.getByEmail(userMock.email)
    expect(user).toEqual(userMock);
  });

  it('should return error in getByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)
    expect(
      service.getByEmail(userMock.email),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return error in getByEmail (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(
      service.getByEmail(userMock.email),
    ).rejects.toThrow(Error);
  });

  it('should return user in getById', async () => {
    const user = await service.getById(userMock.id)
    expect(user).toEqual(userMock);
  });

  it('should return error in getById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)
    expect(
      service.getById(userMock.id),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return error in getById (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(
      service.getById(userMock.id),
    ).rejects.toThrow(Error);
  });

  it('should return user in getUserRelations', async () => {
    const user = await service.getUserRelations(userMock.id)
    expect(user).toEqual(userMock);
  });

  it('should return error if user exist', async () => {
    expect(service.create(userDtoMock)).rejects.toThrow(BadRequestException);
  });

  it('should return user if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)
    const user = await service.create(userDtoMock);
    expect(user).toEqual(userMock);
  });
});
