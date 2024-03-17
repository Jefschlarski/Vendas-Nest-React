import { Test, TestingModule } from '@nestjs/testing';
import { CorreiosService } from '../correios.service';
import { CityService } from '../../city/city.service';
import { StateService } from '../../state/state.service';
import { HttpService } from '@nestjs/axios';

describe('CorreiosService', () => {
  let service: CorreiosService;
  let cityService: CityService;
  let stateService: StateService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorreiosService,
      {
        provide: CityService,
        useValue: {},
      },
      {
        provide: StateService,
        useValue: {},
      },
      {
        provide: HttpService,
        useValue: {},
      }],
    }).compile();

    service = module.get<CorreiosService>(CorreiosService);
    cityService = module.get<CityService>(CityService);
    stateService = module.get<StateService>(StateService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityService).toBeDefined();
    expect(stateService).toBeDefined();
    expect(httpService).toBeDefined();
  });
});
