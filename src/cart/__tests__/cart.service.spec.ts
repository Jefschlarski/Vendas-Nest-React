import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '../cart.service';
import { Cart } from '../entities/cart.entity';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<Cart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<Cart>>(
      getRepositoryToken(Cart),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartRepository).toBeDefined();
  });
});