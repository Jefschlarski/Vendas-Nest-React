import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { CartProduct } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { ProductService } from '../../product/product.service';
import { cartMock } from '../../cart/__mocks__/cart_mock';
import { NotFoundException } from '@nestjs/common';
import { updateProductDtoMock } from '../../product/__mocks__/update.product.dto.mock';
import { CartDto } from '../../cart/dto/cart.dto';

export const cartDtoMock: CartDto = {
  productId: 1,
  amount: 1
}

export const cartProductMock = {
  id: 1,
  cartId: cartMock.id,
  productId: 1,
  amount: 1,
}

export const updateCartProductDtoMock: CartDto= {
  productId: 1,
  amount: 1
}


describe('CartProductService', () => {
  let service: CartProductService;
  let productRepository: Repository<Product>;
  let cartProductRepository: Repository<CartProduct>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: ProductService,
          useValue: {
            findById: jest.fn().mockResolvedValue(updateProductDtoMock),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
        {
          provide: getRepositoryToken(CartProduct),
          useValue: {
            verifyCartProduct: jest.fn().mockResolvedValue(cartProductMock),
            findOne: jest.fn().mockResolvedValue(cartProductMock),
            find: jest.fn().mockResolvedValue([cartProductMock]),
            save: jest.fn().mockResolvedValue(cartProductMock),
            delete: jest.fn().mockResolvedValue({affected: 1}),
            put: jest.fn().mockResolvedValue(updateCartProductDtoMock),
            update: jest.fn().mockResolvedValue({affected: 1}),
          },
        }
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    cartProductRepository = module.get<Repository<CartProduct>>(getRepositoryToken(CartProduct));
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartProductRepository).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return CartProduct in create', async () => {
    const cartProduct = await service.create(cartDtoMock, cartProductMock.cartId);
    expect(cartProduct).toEqual(cartProductMock);
  })

  it('should return CartProduct in insert', async () => {
    const cartProduct = await service.insert(cartMock, cartDtoMock);
    expect(cartProduct).toEqual(cartProductMock);
  })
  
  it('should return CartProduct in insert if product not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
    expect(await service.insert(cartMock, cartDtoMock)).toEqual(cartProductMock);
  })

  it('should return CartProduct in verifyCartProduct', async () => {
    const cartProduct = await service.verifyCartProduct(cartProductMock.cartId, cartProductMock.productId);
    expect(cartProduct).toEqual(cartProductMock);
  })

  it('should throw NotFoundException in verifyCartProduct if product not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.verifyCartProduct(cartProductMock.cartId, cartProductMock.productId)).rejects.toThrow(NotFoundException);
  })

  it('should return DeleteResult in delete', async () => {
    const deleteResult = await service.delete(cartProductMock.cartId, cartProductMock);
    expect(deleteResult).toEqual({affected: 1});
  })
  
  it('should throw NotFoundException in delete if product not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.delete(cartProductMock.cartId, cartProductMock)).rejects.toThrow(NotFoundException);
  })

  it('should return UpdateResult in update', async () => {
    const updateResult = await service.update(cartProductMock.cartId, updateCartProductDtoMock);
    expect(updateResult).toEqual({affected: 1});
  })

  it('should throw NotFoundException in update if product not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.update(cartProductMock.cartId, updateCartProductDtoMock)).rejects.toThrow(NotFoundException);
  })
});
