import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {

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
                id: 'ASC', // 'ASC' para ascendente, 'DESC' para descendente
            },
        });
        
        if(!categories || categories.length === 0) {
            throw new NotFoundException('Categories empty');
        }

        return categories   
    }
}
