import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { updateProductDtoMock } from '../__mocks__/update.product.dto.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            findOne: jest.fn().mockResolvedValue(productMock),
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue({affected: 1}),
            put: jest.fn().mockResolvedValue(updateProductDtoMock),
          },
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return product in findByName', async () => {
    const product = await service.findByName(productMock.name);
    expect(product).toEqual(productMock);
  })

  it('should throw NotFoundException if findByName return empty', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
    expect(service.findByName(productMock.name)).rejects.toThrow(NotFoundException);
  })

  it('should return all product in findAll', async () => {
    const products = await service.findAll();
    expect(products).toEqual([productMock]);
  })

  it('should throw NotFoundException if findAll return empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrow(NotFoundException);
  })

  it('should return product in create', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);
    const product = await service.create(productMock);
    expect(product).toEqual(productMock); 
  })

  it('should return error in create', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());
    expect(service.create(productMock)).rejects.toThrow();
  })

  it('should throw ConflictException in create if product already exists', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(productMock);
    expect(service.create(productMock)).rejects.toThrow(ConflictException);
  })
  
  it('should return product after insert in DB', async () => {
    jest.spyOn(service, 'findByName').mockRejectedValue(undefined);

    const product = await service.create(productMock);

    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    jest
      .spyOn(categoryService, 'findById')
      .mockRejectedValue(new Error());

    expect(service.create(productMock)).rejects.toThrow(Error);
  });
  
  it('should return product in findById', async () => {
    const product = await service.findById(productMock.id);
    expect(product).toEqual(productMock);
  })
  
  it('should throw NotFoundException if findById return empty', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
    expect(service.findById(productMock.id)).rejects.toThrow(NotFoundException);
  })

  it('should return DeleteResult in delete', async () => {
    const deleteResult = await service.delete(productMock.id);
    expect(deleteResult).toEqual({affected: 1});
  })
  
  it('should throw NotFoundException in delete if product not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.delete(productMock.id)).rejects.toThrow(NotFoundException);
  })

  it('should return product in update', async () => {
    const productUpdate = await service.update(productMock.id, updateProductDtoMock);
    expect(productUpdate).toEqual(productMock); 
  })

  it('should throw NotFoundException in update if product not found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.update(productMock.id, updateProductDtoMock)).rejects.toThrow(NotFoundException);
  })
});
