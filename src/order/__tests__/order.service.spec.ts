import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderProductService } from '../../order-product/order-product.service';
import { PaymentService } from '../../payment/payment.service';
import { CartService } from '../../cart/cart.service';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<Order>;
  let orderProductService: OrderProductService;
  let paymentService: PaymentService;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: 
      [
        OrderService,
        {
          provide: OrderProductService,
          useValue: {
            create: jest.fn().mockResolvedValue({id: 1}),
          }
        },
        {
          provide: getRepositoryToken(Order),
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          }
        },
        {
          provide: PaymentService,
          useValue: {
            create: jest.fn().mockResolvedValue({id: 1}),
          }
        },
        {
          provide: CartService,
          useValue: {
            create: jest.fn().mockResolvedValue({id: 1}),
          }
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    orderProductService = module.get<OrderProductService>(OrderProductService);
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderRepository).toBeDefined();
    expect(paymentService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(cartService).toBeDefined();
  });
});
