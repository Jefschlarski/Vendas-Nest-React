import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../../cart-product/cart-product.service';
import { Repository } from 'typeorm';
import { CartService } from '../cart.service';
import { Cart } from '../entities/cart.entity';
import { cartMock } from '../__mocks__/cart_mock';
import { NotFoundException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<Cart>;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: CartProductService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cartMock),
            save: jest.fn().mockResolvedValue(cartMock),
            delete: jest.fn().mockResolvedValue({affected: 1}),
            find: jest.fn().mockResolvedValue([cartMock]),
            update: jest.fn().mockResolvedValue({affected: 1}),
          },  
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    cartRepository = module.get<Repository<Cart>>(
      getRepositoryToken(Cart),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartProductService).toBeDefined();
    expect(cartRepository).toBeDefined();
  });

  it('should return Cart in create', async () => {
    const cart = await service.create(cartMock.userId);
    expect(cart).toEqual(cartMock);
  })

  it ('should return list of Cart in findAll', async () => {
    const carts = await service.findAll();
    expect(carts).toEqual([cartMock]);
  })

  it('should return Cart in findByUserId', async () => {
    const cart = await service.findByUserId(cartMock.userId);
    expect(cart).toEqual(cartMock);
  })

  it('should throw NotFoundException in findByUserId if cart not found', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findByUserId(cartMock.userId)).rejects.toThrow(NotFoundException);
  })

  it('should return Cart in findById', async () => {
    const cart = await service.findById(cartMock.id);
    expect(cart).toEqual(cartMock);
  })

  it('should return UpdateResult in cleanCart', async () => {
    const updateResult = await service.cleanCart(cartMock.userId);
    expect(updateResult).toEqual({affected: 1});
  })
});