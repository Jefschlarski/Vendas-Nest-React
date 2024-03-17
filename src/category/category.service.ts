import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { PersistenceContract } from '../interfaces/persistence.contract';

@Injectable()
export class CategoryService implements PersistenceContract<Category> {

    constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>
    ){}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
       const category = await this.findByName(createCategoryDto.name).catch(() => undefined); 
        
        if(category) {
            throw new ConflictException('Category already exists');
        }
        
        return await this.categoryRepository.save(createCategoryDto);
    }

    async findById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({where: {id}});
        if(!category) {
            throw new NotFoundException('Category not found');
        }
        return category
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({where: {name}});
        if(!category) {
            throw new NotFoundException('Category not found');
        }
        return category
    }

    async findAll(): Promise<Category[]> {
        const categories = await this.categoryRepository.find({
            order: {
                id: 'ASC',
            },
        });
        
        if(!categories || categories.length === 0) {
            throw new NotFoundException('Categories empty');
        }

        return categories   
    }
    delete(id: number): Promise<boolean> {
        throw new Error('Method not implemented.'); 
    }

    update(id: number, category: Category): Promise<Category | null> {
        throw new Error('Method not implemented.');
    }
}
