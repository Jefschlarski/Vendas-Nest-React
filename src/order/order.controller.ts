import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';

@Roles(UserType.User, UserType.Admin)
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

    @Get()
    async findAllByUserId
    (
        @UserId() userId: number
    )
    {
        return this.orderService.findAllByUserId(userId);
    }

    @Get('/all')
    @Roles(UserType.Admin)
    async findAll()
    {
        return this.orderService.findAll();
    }

    @Get('/:id')
    @Roles(UserType.Admin)
    async findOne
    (
        @Param('id') id: number
    )
    {
        return this.orderService.findOne(id);
    }
}
