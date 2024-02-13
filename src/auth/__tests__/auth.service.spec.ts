import * as authenticateUtils from '../../utils/autenticate';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { userMock } from '../../user/__mocks__/user_mock';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginDtoMock } from '../__mocks__/login_dto.mock';
import { ReturnUserDto } from '../../user/dto/return.user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue:{
            findByEmail: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: JwtService,
          useValue:{
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    // Mockando a função validatePassword
    const validatePasswordMock = jest.spyOn(authenticateUtils, 'validatePassword');
    validatePasswordMock.mockResolvedValue(true);

    // Mockando o método findByEmail
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(userMock);

    const user = await service.login(loginDtoMock);
      
    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userMock),
    });

    // Restaurando a implementação original da função validatePassword
    validatePasswordMock.mockRestore();
  });

  it('should return Error if password invalid and email valid', async () => {
    // Mockando a função validatePassword
    const validatePasswordMock = jest.spyOn(authenticateUtils, 'validatePassword');
    validatePasswordMock.mockResolvedValue(false);

    expect(service.login({ ...loginDtoMock, password: '4234' })).rejects.toThrow(Error);

    // Restaurando a implementação original da função validatePassword
    validatePasswordMock.mockRestore();
  });

  it('should return Error if email not exist', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(undefined);
    expect(service.login(loginDtoMock)).rejects.toThrow(Error);
  });

  it('should return Error', async () => {
    jest.spyOn(userService, 'findByEmail').mockRejectedValue(new Error());
    expect(service.login(loginDtoMock)).rejects.toThrow(Error);
  });
});
