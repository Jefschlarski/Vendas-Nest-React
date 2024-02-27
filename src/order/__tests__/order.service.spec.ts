import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: 
      [
        OrderService, 
        {
          provide: getRepositoryToken(Order),
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderRepository).toBeDefined();
  });
});
