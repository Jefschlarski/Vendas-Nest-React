import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userMock } from '../__mocks__/user_mock';
import { BadRequestException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { userDtoMock } from '../__mocks__/user_dto_mock';
import { invalidPasswordMock, userPasswordMock } from '../__mocks__/update_password_mock';

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
    const user = await service.findByEmail(userMock.email)
    expect(user).toEqual(userMock);
  });

  it('should return error in findByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)
    expect(
      service.findByEmail(userMock.email),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return error in findByEmail (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(
      service.findByEmail(userMock.email),
    ).rejects.toThrow(Error);
  });

  it('should return user in findById', async () => {
    const user = await service.findById(userMock.id)
    expect(user).toEqual(userMock);
  });

  it('should return error in findById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)
    expect(
      service.findById(userMock.id),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return error in findById (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(
      service.findById(userMock.id),
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

  it('should throw exception if old password is invalid', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(userMock)
    expect(service.updatePassword(userMock.id, invalidPasswordMock)).rejects.toThrow(BadRequestException);
  })

  it('should return user in updatePassword', async () => {
    const user = await service.updatePassword(userMock.id, userPasswordMock);
    expect(user).toEqual(userMock);
  })

  it('should throw exception in updatePassword if new password is the same as old', async () => {
    expect(service.updatePassword(userMock.id, invalidPasswordMock)).rejects.toThrow(BadRequestException);
})

  it('should throw exception in updatePassword if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)
    expect(service.updatePassword(userMock.id, userPasswordMock)).rejects.toThrow(NotFoundException);
  })

});
