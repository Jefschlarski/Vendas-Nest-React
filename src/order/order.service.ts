import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)    
        private readonly orderRepository: Repository<Order>,
        private readonly paymentService: PaymentService
    ) {}

    async createOrder(createOrderDto: CreateOrderDto, cartId: number)
    {   
        const payment = await this.paymentService.createPayment(createOrderDto);
        return payment;
    }
}
