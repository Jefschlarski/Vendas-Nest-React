import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        try {
            await this.findByName(createCategoryDto.name)
        } catch (error) {
            throw new BadRequestException(error);
        }
        
        return await this.categoryRepository.save(createCategoryDto);
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({where: {name}});
        if(!category) {
            throw new NotFoundException('Category not found');
        }
        return category
    }

    async findAll(): Promise<Category[]> {
        const category = await this.categoryRepository.find();
        
        if(!category || category.length === 0) {
            throw new NotFoundException('Categories empty');
        }

        return category

        
    }

}
