import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductService } from '../order-product.service';
import { Repository } from 'typeorm';
import { OrderProduct } from '../entities/order-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OrderProductService', () => {
  let service: OrderProductService;
  let orderProductRepository: Repository<OrderProduct>;

  const orderProductMock = {
    id: 1,
    orderId: 1,
    productId: 1,
    quantity: 1,
    price: 1,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderProductService,
      {
        provide: getRepositoryToken(OrderProduct),
        useValue: {
          findOne: jest.fn().mockResolvedValue(orderProductMock),
          save: jest.fn().mockResolvedValue(orderProductMock),
          update: jest.fn().mockResolvedValue({affected: 1}),
        },
      }],
    }).compile();

    service = module.get<OrderProductService>(OrderProductService);
    orderProductRepository = module.get<Repository<OrderProduct>>(
      getRepositoryToken(OrderProduct),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderProductRepository).toBeDefined();
  });
});
