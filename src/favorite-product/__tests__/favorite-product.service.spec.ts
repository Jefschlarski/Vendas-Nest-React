import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteProductService } from '../favorite-product.service';
import { ProductService } from '../../product/product.service';
import { FavoriteProduct } from '../entities/favorite-product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { productMock } from '../../product/__mocks__/product.mock';
import { favoriteProductMock } from '../__mocks__/favorite-product-mock';

describe('FavoriteProductService', () => {
  let service: FavoriteProductService;
  let favoriteProductRepository: Repository<FavoriteProduct>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteProductService,
      {
        provide: ProductService,
        useValue: {
          findById: jest.fn().mockResolvedValue(productMock),
        },
      },
      {
        provide: getRepositoryToken(FavoriteProduct),
        useValue: {
          find: jest.fn().mockResolvedValue([favoriteProductMock]),
          findOne: jest.fn().mockResolvedValue(null),
          save: jest.fn().mockResolvedValue(favoriteProductMock),
          delete: jest.fn().mockResolvedValue({affected: 1}),
          update: jest.fn().mockResolvedValue({affected: 1}),
        },
      }],
    }).compile();

    service = module.get<FavoriteProductService>(FavoriteProductService);
    productService = module.get<ProductService>(ProductService);
    favoriteProductRepository = module.get<Repository<FavoriteProduct>>(getRepositoryToken(FavoriteProduct));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(favoriteProductRepository).toBeDefined();
  });

  it('should return FavoriteProduct in create', async () => {
    jest.spyOn(favoriteProductRepository, 'findOne').mockResolvedValue(null);
    const favoriteProduct = await service.create(1, 1);
    expect(favoriteProduct).toEqual(favoriteProductMock);
  })

  it('should return ConflictException in create when FavoriteProduct already exists', async () => {
    jest.spyOn(favoriteProductRepository, 'findOne').mockResolvedValue(favoriteProductMock);
    expect(service.create(1, 1)).rejects.toThrow(ConflictException);
  })

  it('should return NotFoundException in create when Product not found', async () => {;
    jest.spyOn(productService, 'findById').mockResolvedValue(null);
    expect(service.create(1, 1)).rejects.toThrow(NotFoundException);
  })

  it('should return FavoriteProduct in findOneByUserIdAndProductId', async () => {
    jest.spyOn(favoriteProductRepository, 'findOne').mockResolvedValue(favoriteProductMock);
    const favoriteProduct = await service.findOneByUserIdAndProductId(1, productMock.id);
    expect(favoriteProduct).toEqual(favoriteProductMock);
  })

  it('should return NotFoundException in findOneByUserIdAndProductId when FavoriteProduct not found', async () => {
    jest.spyOn(favoriteProductRepository, 'findOne').mockResolvedValue(null);
    expect(service.findOneByUserIdAndProductId(1, 1)).rejects.toThrow(NotFoundException);
  })

  it('should return FavoriteProducts in findAllByUserId', async () => {
    const favoriteProducts = await service.findAllByUserId(favoriteProductMock.userId);
    expect(favoriteProducts).toEqual([favoriteProductMock]);
  })

  it('should return NotFoundException in findAllByUserId when FavoriteProducts not found', async () => {
    jest.spyOn(favoriteProductRepository, 'find').mockResolvedValue([]);
    expect(service.findAllByUserId(1)).rejects.toThrow(NotFoundException);
  })

  it('should return DeleteResult in delete', async () => {
    jest.spyOn(favoriteProductRepository, 'findOne').mockResolvedValue(favoriteProductMock);
    const deleteResult = await service.delete(1, productMock.id);
    expect(deleteResult).toEqual({affected: 1});
  })

  it('should return NotFoundException in delete when FavoriteProduct not found', async () => {
    jest.spyOn(favoriteProductRepository, 'findOne').mockResolvedValue(null);
    expect(service.delete(1, 1)).rejects.toThrow(NotFoundException);
  })

  //TODO FEATURE DE STATUS NO FAVORITE PARA DAR UPDATE
  it('should return UpdateResult in update', async () => {
    jest.spyOn(favoriteProductRepository, 'findOne').mockResolvedValue(favoriteProductMock);
    const updateResult = await service.update(1, favoriteProductMock.product.id);
    expect(updateResult).toEqual({affected: 1});
  })

  it('shoul throw NotFoundException in update when FavoriteProduct not found', async () => {
    jest.spyOn(service, 'findOneByUserIdAndProductId').mockResolvedValue(null);
    expect(service.update(1, 1)).rejects.toThrow(NotFoundException);
  })
});
