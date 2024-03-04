import { Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';   
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ReturnCategoryDto } from './dto/returnCategory.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnCategoryListDto } from './dto/returnCategoryList.dto';


@Controller('category')
@Roles(UserType.User, UserType.Admin)
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
    @UsePipes(ValidationPipe)
    async findAll(): Promise<ReturnCategoryListDto> {
        const categories = await this.categoryService.findAll();
        return new ReturnCategoryListDto(categories);
    }
}
