import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ) {}

    @Post()
    async create
    (
        @Body() createOrderDto: CreateOrderDto,
        @UserId() userId: number
    )
    {
        return this.orderService.create(createOrderDto, userId);
    }
}
