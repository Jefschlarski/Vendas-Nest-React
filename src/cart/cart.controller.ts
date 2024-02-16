import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { CartDto } from './dto/cart.dto';
import { Cart } from './entities/cart.entity';
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
    async getCart(@UserId() userId: number): Promise<Cart>{
        return await this.cartService.findByUserId(userId);
    }
}
