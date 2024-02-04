<<<<<<< HEAD
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
=======
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
>>>>>>> develop
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
<<<<<<< HEAD
       const category = await this.findByName(createCategoryDto.name).catch(() => undefined); 
        
        if(category) {
            throw new ConflictException('Category already exists');
=======
        try {
            await this.findByName(createCategoryDto.name)
        } catch (error) {
            throw new BadRequestException(error);
>>>>>>> develop
        }
        
        return await this.categoryRepository.save(createCategoryDto);
    }

<<<<<<< HEAD
    async findById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({where: {id}});
        if(!category) {
            throw new NotFoundException('Category not found');
        }
        return category
    }

=======
>>>>>>> develop
    async findByName(name: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({where: {name}});
        if(!category) {
            throw new NotFoundException('Category not found');
        }
        return category
    }

    async findAll(): Promise<Category[]> {
<<<<<<< HEAD
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
=======
        const category = await this.categoryRepository.find();
        
        if(!category || category.length === 0) {
            throw new NotFoundException('Categories empty');
        }

        return category

        
    }

>>>>>>> develop
}
