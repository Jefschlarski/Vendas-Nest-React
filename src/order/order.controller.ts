import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ) {}

    @Post('/cart/:cartId')
    async createOrder
    (
        @Body() createOrderDto: CreateOrderDto,
        @Param('cartId') cartId: number
    )
    {
        return this.orderService.createOrder(createOrderDto, cartId);
    }
}
