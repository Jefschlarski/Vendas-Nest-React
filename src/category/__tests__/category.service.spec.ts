import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../__mocks__/category.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { createCategoryDtoMock } from '../__mocks__/createCategory.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOne: jest.fn().mockResolvedValue(categoryMock),
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should return category in findById', async () => {
    const category = await service.findById(categoryMock.id);
    expect(category).toEqual(categoryMock);
  })

  it('should throw NotFoundException if findById return empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);
    expect(service.findById(categoryMock.id)).rejects.toThrow(NotFoundException);
  })

  it('should return category in findByName', async () => {
    const category = await service.findByName(categoryMock.name);
    expect(category).toEqual(categoryMock);
  })

  it('should throw NotFoundException if findByName return empty', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);
    expect(service.findByName(categoryMock.name)).rejects.toThrow(NotFoundException);
  })
  

  it('should return all category in findAll', async () => {
    const categories = await service.findAll();
    expect(categories).toEqual([categoryMock]);
  })

  it('should throw NotFoundException if findAll return empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrow(NotFoundException);
  })

  it('should return error if findAll throws exception', async () => {
    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAll()).rejects.toThrow(Error);
  })


  it('should return category in create', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    const category = await service.create(createCategoryDtoMock);
    expect(category).toEqual(categoryMock);
  })

  it('should return error in create', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());
    expect(service.create(createCategoryDtoMock)).rejects.toThrow(Error);
  })

  it('should throw ConflictException in create if category already exists', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(categoryMock);
    expect(service.create(createCategoryDtoMock)).rejects.toThrow(ConflictException);  
  })

});
