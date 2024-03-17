import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnFavoriteProductListDto } from './dto/return-favorite-product-list.dto';

@Controller('favorite-product')
export class FavoriteProductController {
    constructor(private readonly favoriteProductService: FavoriteProductService){}
    
    @Post('/:id')
    @Roles(UserType.User)
    async create(@Param('id') productId: number, @UserId() userId: number): Promise<FavoriteProduct>{
        return await this.favoriteProductService.create(productId, userId);
    }

    @Delete('/:id')
    @Roles(UserType.User)
    async delete(@UserId() userId: number, @Param('id') productId: number): Promise<DeleteResult>{
        return await this.favoriteProductService.delete(userId, productId);
    }

    @Get()
    @Roles(UserType.User)
    async findAllByUserId(@UserId() userId: number): Promise<ReturnFavoriteProductListDto>{
        const favoriteProducts = await this.favoriteProductService.findAllByUserId(userId);
        return new ReturnFavoriteProductListDto(favoriteProducts);
    }
}
