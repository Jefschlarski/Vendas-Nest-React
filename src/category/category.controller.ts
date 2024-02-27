import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';   
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ReturnCategoryDto } from './dto/returnCategory.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';


@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ){}  
    
    @Post()
    @Roles(UserType.Admin)
    async create(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category);
    }     
    @Get()
    @Roles(UserType.User)
    @UsePipes(ValidationPipe)
    async findAll(): Promise<ReturnCategoryDto[]> {
        return (await this.categoryService.findAll()).map((category) => new ReturnCategoryDto(category));
    }
}
