import { Body, Controller, Get, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CartService } from './cart.service';
import { UserId } from '../decorators/user-id.decorator';
import { CartDto } from './dto/cart.dto';
import { Cart } from './entities/cart.entity';
import { ReturnCartDto } from './dto/return-cart.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Roles(UserType.User)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Post()
    @UsePipes(ValidationPipe)
    async addProductToCart(@Body() cartDto: CartDto, @UserId() userId: number): Promise<Cart>{
        return await this.cartService.addProductToCart(cartDto, userId);
    }
    
    @Get()
    @UsePipes(ValidationPipe)
    async getCart(@UserId() userId: number): Promise<ReturnCartDto>{
        return new ReturnCartDto(await this.cartService.findByUserId(userId, true));
    } 

    @Put('clean')
    @UsePipes(ValidationPipe)
    async cleanCart(@UserId() userId: number): Promise<UpdateResult>{
        return await this.cartService.cleanCart(userId);
    }

    @Put()
    @UsePipes(ValidationPipe)
    async updateCart(@Body() cartDto: CartDto, @UserId() userId: number): Promise<UpdateResult | DeleteResult>{
        return await this.cartService.updateProductCart(cartDto, userId);
    }

}
