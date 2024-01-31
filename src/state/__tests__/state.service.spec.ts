import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from '../state.service';
import { Repository } from 'typeorm';
import { State } from '../entities/state.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { stateMock } from '../__mocks__/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<State>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService,
      {
        provide:getRepositoryToken(State),
        useValue: {
          find: jest.fn().mockResolvedValue([stateMock]),
        }
      }],
    }).compile();

    
    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<State>>(
      getRepositoryToken(State),
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  })

  it('should return list of states', async () => {
    const state = await service.getAll();
    expect(state).toEqual([stateMock]);
  })

  it('should return error in exception', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());
    expect(service.getAll()).rejects.toThrow(Error);
  })
});
